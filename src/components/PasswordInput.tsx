import type React from 'react';
import type { PasswordData } from '../types';

interface PasswordInputProps {
    data: PasswordData;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    setCreatedAt: React.Dispatch<React.SetStateAction<number | null>>;
    showPassword: boolean;
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

function PasswordInput({
                           data,
                           setPassword,
                           setCreatedAt,
                           showPassword,
                           setShowPassword,
                       }: PasswordInputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (data.password === '' && value !== '') {
            setCreatedAt(Date.now());
        }

        if (value === '') {
            setCreatedAt(null);
        }

        setPassword(value);
    };

    return (
        <div className="box">
            <h2>Zadání hesla</h2>

            <div className="input-group">
                <input
                    className="form-control custom-input"
                    type={showPassword ? 'text' : 'password'}
                    value={data.password}
                    onChange={handleChange}
                    placeholder="Zadej heslo"
                />

                <button
                    className="btn custom-btn"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? 'Skrýt' : 'Zobrazit'}
                </button>
            </div>
        </div>
    );
}

export default PasswordInput;