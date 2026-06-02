const otpTemplate = (name, otp) => {
  return `
  
  <div style="
    max-width:600px;
    margin:auto;
    padding:40px;
    background:#ffffff;
    font-family:Arial;
    border-radius:20px;
  ">

    <h1 style="
      text-align:center;
      color:#2563eb;
      font-size:40px;
    ">
      WashGo
    </h1>

    <hr style="
      margin:40px 0;
      border:none;
      border-top:1px solid #ddd;
    " />

    <p style="
      font-size:20px;
      color:#111827;
    ">
      Hi <strong>${name}</strong>,
    </p>

    <p style="
      font-size:18px;
      color:#374151;
      line-height:32px;
    ">
      We received a request to reset your password for your WashGo account.
    </p>

    <p style="
      font-size:18px;
      color:#374151;
    ">
      Your One-Time Password (OTP) is:
    </p>

    <div style="
      margin:40px 0;
      text-align:center;
    ">

      <span style="
        display:inline-block;
        background:#2563eb;
        color:white;
        padding:20px 50px;
        border-radius:16px;
        font-size:40px;
        font-weight:bold;
        letter-spacing:8px;
      ">
        ${otp}
      </span>

    </div>

    <p style="
      font-size:16px;
      color:#6b7280;
      line-height:30px;
    ">
      This OTP will expire in 
      <strong>10 minutes</strong>.
      Please do not share this code with anyone.
    </p>

    <p style="
      font-size:16px;
      color:#6b7280;
      line-height:30px;
    ">
      If you did not request this password reset,
      you can safely ignore this email.
    </p>

    <br />

    <p style="
      font-size:18px;
      color:#111827;
    ">
      Best Regards,
      <br />
      <strong>WashGo</strong>
    </p>

    <div style="
      margin-top:60px;
      text-align:center;
      color:#9ca3af;
      font-size:14px;
    ">
      © 2026 WashGo. All rights reserved.
    </div>

  </div>
  `;
};

export default otpTemplate;
