import { useEffect, useState } from 'react';
import './index.css';
import './App.css';
import PasswordInput from './components/PasswordInput';
import PasswordStrength from './components/PasswordStrength';
import CharacterSequenceValidator from './components/CharacterSequenceValidator';
import PasswordTimeValidator from './components/PasswordTimeValidator';
import CountryFlagValidator from './components/CountryFlagValidator';
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

    // 👉 vyhodnocení síly hesla
    useEffect(() => {
        const strength = evaluatePassword(password);
        setPasswordStrength(strength);
    }, [password]);

    // 👉 změna titulku
    useEffect(() => {
        document.title = `Síla hesla: ${passwordStrength}`;
    }, [passwordStrength]);

    // 👉 časovač (pro refresh UI)
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // 👉 sabotáž hesla
    useEffect(() => {
        const sabotageInterval = setInterval(() => {
            setPassword(prevPassword => {
                const action = Math.random() < 0.5 ? 'add' : 'remove';

                if (action === 'add') {
                    return prevPassword + "😜";
                } else {
                    if (prevPassword.length === 0) return prevPassword;
                    const index = Math.floor(Math.random() * prevPassword.length);
                    return prevPassword.slice(0, index) + prevPassword.slice(index + 1);
                }
            });
        }, 120000); // 2 minuty

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

            <div className="card card-box p-4 mb-4">
                <PasswordTimeValidator data={data} />
            </div>

            {/* 👉 TADY JE TA VLAJKA */}
            <div className="card card-box p-4 mb-4">
                <CountryFlagValidator password={password} />
            </div>
        </div>
    );
}

export default App;