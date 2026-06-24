// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { createElement } from 'react';
import { InquiryNotificationEmail } from '@/components/contact/EmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

const inquirySchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required").max(2000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = inquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input." },
        { status: 400 }
      );
    }

    const { name, email, message } = parsed.data;

    const { data, error } = await resend.emails.send({
      from: 'AURUM Concierge <onboarding@resend.dev>',
      to: [process.env.CONTACT_NOTIFICATION_EMAIL ?? 'waveb6133@gmil.com'],
      replyTo: email,
      subject: `New inquiry from ${name}`,
      react: createElement(InquiryNotificationEmail, { name, email, message }),
    });

    console.log(`${name}`);
    

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send your message. Please try again.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id }, { status: 200 });
  } catch (error) {
    console.error('Contact route error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}