import { useEffect, useState } from 'react';
import './index.css';
import './App.css';
import PasswordInput from './components/PasswordInput';
import PasswordStrength from './components/PasswordStrength';
import CharacterSequenceValidator from './components/CharacterSequenceValidator';
import PasswordTimeValidator from './components/PasswordTimeValidator';
import type { PasswordData } from './types';

function App() {
    const [password, setPassword] = useState('');
    const [createdAt, setCreatedAt] = useState<number | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState('-');

    const [, setTime] = useState(0);

    function evaluatePassword(password: string): string {
        let score = 0;

        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[!@#$%^&*]/.test(password)) score++;

        if (password === '') return '-';
        if (score <= 1) return 'Slabé';
        if (score <= 3) return 'Střední';
        return 'Silné';
    }

    useEffect(() => {
        const strength = evaluatePassword(password);
        setPasswordStrength(strength);
    }, [password]);

    useEffect(() => {
        document.title = `Síla hesla: ${passwordStrength}`;
    }, [passwordStrength]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const sabotageInterval = setInterval(() => {
            setPassword(prevPassword => {
                // Náhodně rozhodneme, zda přidáme emoji nebo odebereme znak
                const action = Math.random() < 0.5 ? 'add' : 'remove';
                if (action === 'add') {
                    // Přidáme emoji ke stávajícímu heslu
                    return prevPassword + "😜";
                } else {
                    // Odebereme náhodný znak, pokud heslo není prázdné
                    if (prevPassword.length === 0) return prevPassword;
                    const index = Math.floor(Math.random() * prevPassword.length);
                    return prevPassword.slice(0, index) + prevPassword.slice(index + 1);
                }
            });
        }, 120000);
        return () => clearInterval(sabotageInterval);
    }, []);

    const data: PasswordData = {
        password,
        createdAt,
    };

    return (
        <div className="app container">
            <h1 className="app-title">Password Checker</h1>

            <div className="card card-box p-4 mb-4">
                <PasswordInput
                    data={data}
                    setPassword={setPassword}
                    setCreatedAt={setCreatedAt}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                />
            </div>

            <div className="card card-box p-4 mb-4">
                <PasswordStrength
                    data={data}
                    passwordStrength={passwordStrength}
                />
            </div>

            <div className="card card-box p-4 mb-4">
                <CharacterSequenceValidator data={data} />
            </div>

            <div className="card card-box p-4">
                <PasswordTimeValidator data={data} />
            </div>
        </div>
    );
}

export default App;