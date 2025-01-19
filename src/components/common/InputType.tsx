import { LucideProps } from 'lucide-react'
import React from 'react'

interface InputTypeProps {
    Icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
}

export default function InputType({ Icon, ...props }: InputTypeProps & React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div className="relative">
            {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#8CB9C7' }} />}
            <input
                {...props}
                className="w-full px-10 py-3 rounded-lg bg-white bg-opacity-10 border focus:ring-2 focus:ring-opacity-50 transition-all outline-none"
                style={{
                    borderColor: '#8CB9C7',
                    color: '#B8D8E1',
                    caretColor: '#B8D8E1'
                }}
            />
        </div>
    )
}
