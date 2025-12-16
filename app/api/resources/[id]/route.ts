import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.NEXT_BACKEND_API_URL || "https://dev.bridgespero.com/api/v1";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const access_token = cookieStore.get("access_token");

    // Require authentication for accessing recordings
    if (!access_token) {
      return new Response(
        JSON.stringify({
          errorCode: "UNAUTHORIZED",
          errorMessage: "No access token found",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const download = searchParams.get("download") === "true";

    const headers = new Headers();
    headers.append("Authorization", `Bearer ${access_token.value}`);

    const rangeHeader = request.headers.get("Range");
    if (rangeHeader) {
      headers.append("Range", rangeHeader);
    }

    const response = await fetch(
      `${API_BASE_URL}/resources/${id}?download=${download}`,
      {
        method: "GET",
        headers,
        cache: "no-store",
        // @ts-expect-error - duplex is required for proper streaming
        duplex: "half",
      }
    );

    console.log("RESOURCE RESPONSE", response);

    if (!response.ok) {
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Stream the video/file (works for both download=true and download=false)
    const contentType = response.headers.get("Content-Type") || "application/octet-stream";
    const contentDisposition = response.headers.get("Content-Disposition");
    const contentLength = response.headers.get("Content-Length");
    const contentRange = response.headers.get("Content-Range");
    const acceptRanges = response.headers.get("Accept-Ranges");

    const responseHeaders = new Headers();
    responseHeaders.set("Content-Type", contentType);

    // Important: Disable response buffering to prevent RAM issues
    responseHeaders.set("X-Accel-Buffering", "no");

    if (contentDisposition) {
      responseHeaders.set("Content-Disposition", contentDisposition);
    }

    // Forward range-related headers for proper video seeking
    if (contentLength) {
      responseHeaders.set("Content-Length", contentLength);
    }
    if (contentRange) {
      responseHeaders.set("Content-Range", contentRange);
    }
    if (acceptRanges) {
      responseHeaders.set("Accept-Ranges", acceptRanges);
    }

    return new Response(response.body, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Error fetching resource:", error);
    return new Response(
      JSON.stringify({
        errorCode: "INTERNAL_ERROR",
        errorMessage: "Failed to fetch resource",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const access_token = cookieStore.get("access_token");

    if (!access_token) {
      return new Response(
        JSON.stringify({
          errorCode: "UNAUTHORIZED",
          errorMessage: "No access token found",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { id } = await params;

    const headers = new Headers();
    headers.append("Authorization", `Bearer ${access_token.value}`);
    headers.append("Content-Type", "application/json");

    const response = await fetch(
      `${API_BASE_URL}/resources/${id}`,
      {
        method: "DELETE",
        headers,
        cache: "no-store",
      }
    );

    if (response.status === 204) {
      return new Response(null, {
        status: 204,
      });
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error deleting resource:", error);
    return new Response(
      JSON.stringify({
        errorCode: "INTERNAL_ERROR",
        errorMessage: "Failed to delete resource",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
