function Meter({ password }: { password: string }) {
  const atLeastOneUppercase = /[A-Z]/g;
  const atLeastOneLowercase = /[a-z]/g;
  const atLeastOneNumeric = /[0-9]/g;
  const atLeastOneSpecialChar = /[#?!@$%^&*-]/g;
  const eightCharsOrMore = /.{8,}/g;

  const passwordTracker = {
    uppercase: password.match(atLeastOneUppercase),
    lowercase: password.match(atLeastOneLowercase),
    number: password.match(atLeastOneNumeric),
    specialChar: password.match(atLeastOneSpecialChar),
    eightCharsOrGreater: password.match(eightCharsOrMore),
  };

  const passwordStrength = Object.values(passwordTracker).filter((value) => value).length;

  return (
    <div className="password-strength-meter_container">
      <div className="password-strength-meter"></div>
      <div className="word-meter">
        {passwordStrength < 5 && 'Must contain '}
        {!passwordTracker.uppercase && 'uppercase, '}
        {!passwordTracker.lowercase && 'lowercase, '}
        {!passwordTracker.specialChar && 'special character, '}
        {!passwordTracker.number && 'number, '}
        {!passwordTracker.eightCharsOrGreater && 'eight characters or more'}
      </div>
      <style>
        {`
          .password-strength-meter {
            height: 0.3rem;
            background-color: lightgrey;
            border-radius: 3px;
            margin: 0.5rem 0;
          }

          .word-meter{
            visibility: hidden;
          }

          .password-strength-meter::before {
            content: '';
            background-color: ${
              ['red', 'orange', '#03a2cc', '#03a2cc', '#0ce052'][passwordStrength - 1] || ''
            };
            height: 100%;
            width: ${(passwordStrength / 5) * 100}%;
            display: block;
            border-radius: 3px;
            transition: width 0.2s;
          }
        `}
      </style>
    </div>
  );
}

export { Meter };
