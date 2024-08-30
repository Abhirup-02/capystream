interface ResultsProps {
    term?: string;
}

export function Results({ term }: ResultsProps) {
    return (
        <div>
            <h2>
                Results for term &quot;{term}&quot;
            </h2>
        </div>
    )
}

export function ResultsSkeleton() {
    return (
        <div>
            
        </div>
    )
}
