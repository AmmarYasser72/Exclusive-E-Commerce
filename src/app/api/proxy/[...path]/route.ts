import { NextRequest, NextResponse } from "next/server";

import { ROUTE_API_BASE } from "@/lib/route-api";

async function forwardRequest(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const search = req.nextUrl.searchParams.toString();
  const url = `${ROUTE_API_BASE}/${path.join("/")}${search ? `?${search}` : ""}`;

  const token = req.headers.get("token") ?? req.headers.get("x-auth-token");
  const contentType = req.headers.get("content-type") ?? "application/json";

  const response = await fetch(url, {
    method: req.method,
    headers: {
      "Content-Type": contentType,
      ...(token ? { token } : {}),
    },
    body:
      req.method === "GET" || req.method === "HEAD"
        ? undefined
        : await req.text(),
    cache: "no-store",
  });

  const payloadText = await response.text();

  return new NextResponse(payloadText, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("content-type") ?? "application/json",
    },
  });
}

export async function GET(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return forwardRequest(req, context);
}

export async function POST(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return forwardRequest(req, context);
}

export async function PUT(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return forwardRequest(req, context);
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return forwardRequest(req, context);
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return forwardRequest(req, context);
}
