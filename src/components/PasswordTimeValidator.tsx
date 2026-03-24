import type { PasswordData } from '../types';

interface Props {
    data: PasswordData;
}

function PasswordTimeValidator({ data }: Props) {
    if (data.createdAt === null || data.password === '') {
        return (
            <div>
                <h2 className="mb-3">Časová validace</h2>
                <p className="muted-text">0 s</p>
            </div>
        );
    }

    const seconds = Math.floor((Date.now() - data.createdAt) / 1000);

    const valid = seconds >= 5;

    return (
        <div>
            <h2 className="mb-3">Časová validace</h2>

            <ul className="list-group">
                <li className="list-group-item">
                    Čas zadávání hesla: {seconds} s
                </li>

                <li className="list-group-item" data-valid={valid}>
                    {valid ? 'OK' : 'BAD'} Heslo nebylo zadáno příliš rychle
                </li>
            </ul>
        </div>
    );
}

export default PasswordTimeValidator;