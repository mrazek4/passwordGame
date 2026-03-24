import type { PasswordData } from '../types';

interface Props {
    data: PasswordData;
}

function CharacterSequenceValidator({ data }: Props) {
    const password = data.password;

    let count = 0;

    for (let i = 0; i < password.length - 3; i++) {
        const a = password[i];
        const b = password[i + 1];
        const c = password[i + 2];
        const d = password[i + 3];

        const lower = /[a-z]/.test(a);
        const upper = /[A-Z]/.test(b);
        const number = /[0-9]/.test(c);
        const special = /[!@#$%^&*]/.test(d);

        if (lower && upper && number && special) {
            count++;
        }
    }

    const valid = count > 0;

    return (
        <div>
            <h2 className="mb-3">Kontrola sekvence znaků</h2>

            <ul className="list-group">
                <li className="list-group-item" data-valid={valid}>
                    {valid ? 'OK' : 'BAD'} Sekvence malý → velký → číslo →
                    speciální znak
                </li>

                <li className="list-group-item">
                    Počet nalezených sekvencí: {count}
                </li>
            </ul>
        </div>
    );
}

export default CharacterSequenceValidator;