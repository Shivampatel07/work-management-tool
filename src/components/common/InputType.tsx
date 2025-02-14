import { AlertCircle, Eye, EyeOff, LucideProps } from 'lucide-react'
import React, { useState } from 'react'

interface InputTypeProps {
    Icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
    errorMessage?: string
    className?: string
}

export default function InputType({ Icon, errorMessage, className, ...props }: InputTypeProps & React.InputHTMLAttributes<HTMLInputElement>) {
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordShow = () => {
        setShowPassword(!showPassword)
    }

    return (
        <>
            <div className="relative w-full">
                {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#8CB9C7' }} />}
                <input
                    {...props}
                    className={`${className || ''} w-full px-10 py-3 rounded-lg bg-white bg-opacity-10 border transition-all outline-none`}
                    style={{
                        borderColor: '#8CB9C7',
                        color: '#B8D8E1',
                        caretColor: '#B8D8E1'
                    }}
                    type={props.type === 'password' ? (showPassword ? 'text' : 'password') : props.type}
                />
                {props.type === 'password' && (
                    <div className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer select-none' onClick={togglePasswordShow}>
                        {showPassword
                            ? <Eye className='w-5 h-5' style={{ color: '#8CB9C7' }} />
                            : <EyeOff className='w-5 h-5' style={{ color: '#8CB9C7' }} />
                        }
                    </div>
                )}
            </div>
            {errorMessage && <div className="flex items-center gap-2 mt-1">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <p className="text-xs text-red-400 font-medium">{errorMessage}</p>
            </div>}
        </>
    )
}
