import * as React from 'react';

interface InquiryNotificationEmailProps {
    name: string;
    email: string;
    message: string;
}

export const InquiryNotificationEmail: React.FC<Readonly<InquiryNotificationEmailProps>> = ({
    name,
    email,
    message,
}) => {
    const colors = {
        gold: '#745A27',
        charcoal: '#3A2F22',
        muted: '#9E9185',
        border: '#E0D5C8',
        bgLight: '#FFF8F3',
        bgPure: '#FFFFFF',
    };

    return (
        <div style={{
            backgroundColor: colors.bgLight,
            fontFamily: 'Georgia, serif',
            padding: '40px 20px',
            color: colors.charcoal,
        }}>
            <table align="center" width="100%" cellPadding={0} cellSpacing={0} style={{
                maxWidth: '560px',
                backgroundColor: colors.bgPure,
                border: `1px solid ${colors.border}`,
                borderRadius: '4px',
                padding: '40px',
            }}>
                <tbody>
                    <tr>
                        <td align="center" style={{ paddingBottom: '30px', borderBottom: `1px solid ${colors.border}` }}>
                            <h1 style={{
                                margin: 0,
                                fontSize: '28px',
                                fontWeight: 'normal',
                                letterSpacing: '4px',
                                textTransform: 'uppercase',
                                color: colors.charcoal,
                            }}>
                                AURUM
                            </h1>
                            <p style={{
                                margin: '5px 0 0 0',
                                fontSize: '10px',
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                color: colors.muted,
                            }}>
                                Fine horology management
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style={{ paddingTop: '30px', paddingBottom: '20px' }}>
                            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'normal', lineHeight: '1.4' }}>
                                New client inquiry received
                            </h2>
                            <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: colors.muted, fontFamily: 'sans-serif' }}>
                                An administrative record has been logged for review.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <table width="100%" cellPadding={0} cellSpacing={0} style={{
                                fontFamily: 'sans-serif',
                                fontSize: '13px',
                                marginBottom: '24px',
                            }}>
                                <tbody>
                                    <tr>
                                        <td style={{ width: '90px', padding: '8px 0', color: colors.muted, textTransform: 'uppercase', fontSize: '10px', letterSpacing: '1px' }}>
                                            Client
                                        </td>
                                        <td style={{ padding: '8px 0', color: colors.charcoal, fontWeight: 'bold' }}>
                                            {name}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '8px 0', color: colors.muted, textTransform: 'uppercase', fontSize: '10px', letterSpacing: '1px' }}>
                                            Email
                                        </td>
                                        <td style={{ padding: '8px 0', color: colors.gold }}>
                                            <a href={`mailto:${email}`} style={{ color: colors.gold, textDecoration: 'none' }}>
                                                {email}
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style={{
                            backgroundColor: colors.bgLight,
                            padding: '24px',
                            borderRadius: '4px',
                            borderLeft: `3px solid ${colors.gold}`,
                        }}>
                            <span style={{
                                display: 'block',
                                fontSize: '10px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                color: colors.muted,
                                fontFamily: 'sans-serif',
                                marginBottom: '8px',
                            }}>
                                Inquiry message
                            </span>
                            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', whiteSpace: 'pre-wrap', color: colors.charcoal }}>
                                "{message}"
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style={{ paddingTop: '35px', paddingBottom: '20px' }}>

                            <a href={process.env.NEXT_PUBLIC_ADMIN_URL ?? 'https://aurum.rw/admin/dashboard'}
                                style={{
                                    backgroundColor: colors.gold,
                                    color: '#FFF8F3',
                                    fontFamily: 'sans-serif',
                                    fontSize: '12px',
                                    fontWeight: 'normal',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    textDecoration: 'none',
                                    padding: '14px 32px',
                                    borderRadius: '4px',
                                    display: 'inline-block',
                                }}
                            >
                                Open management suite
                            </a>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '24px' }}>
                            <p style={{ margin: 0, fontFamily: 'sans-serif', fontSize: '11px', color: colors.muted, lineHeight: '1.5' }}>
                                Purveyors of fine horology.<br />
                                © 2026 AURUM. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};