import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://dev.bridgespero.com/api/v1";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${API_BASE_URL}/auth/signup/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log(response);

    if (response.status === 200) {
      return NextResponse.json(null, { status: 201 });
    }

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }
  } catch (error) {
    console.error("Student registration error:", error);
    return NextResponse.json(
      {
        errorCode: "INTERNAL_SERVER_ERROR",
        errorMessage: "An error occurred during registration",
      },
      { status: 500 }
    );
  }
}
