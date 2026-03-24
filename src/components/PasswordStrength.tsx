import type { PasswordData } from '../types';

interface PasswordStrengthProps {
    data: PasswordData;
    passwordStrength: string;
}

function PasswordStrength({
                              data,
                              passwordStrength,
                          }: PasswordStrengthProps) {
    const password = data.password;

    const hasLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);

    let score = 0;
    if (hasLength) score++;
    if (hasUppercase) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;

    let barClass = '';

    if (passwordStrength === 'Slabé') {
        barClass = 'weak';
    } else if (passwordStrength === 'Střední') {
        barClass = 'medium';
    } else if (passwordStrength === 'Silné') {
        barClass = 'strong';
    }

    return (
        <div>
            <h2 className="mb-3">Síla hesla</h2>

            <p className="fw-bold">Výsledek: {passwordStrength}</p>

            <div className="strength-bar mb-3">
                <div
                    className={`strength-fill ${barClass}`}
                    style={{ width: score * 25 + '%' }}
                ></div>
            </div>

            <ul className="list-group">
                <li className="list-group-item" data-valid={hasLength}>
                    {hasLength ? 'OK' : 'BAD'} Minimálně 8 znaků
                </li>

                <li className="list-group-item" data-valid={hasUppercase}>
                    {hasUppercase ? 'OK' : 'BAD'} Alespoň jedno velké písmeno
                </li>

                <li className="list-group-item" data-valid={hasNumber}>
                    {hasNumber ? 'OK' : 'BAD'} Alespoň jedno číslo
                </li>

                <li className="list-group-item" data-valid={hasSpecial}>
                    {hasSpecial ? 'OK' : 'BAD'} Alespoň jeden speciální znak
                </li>
            </ul>
        </div>
    );
}

export default PasswordStrength;