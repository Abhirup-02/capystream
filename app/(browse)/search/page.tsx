import { redirect } from "next/navigation";
import { Results } from "./_components/results";

interface SearchPageProps {
    searchParamas: {
        term?: string;
    }
}

export default function SearchPage({ searchParamas }: SearchPageProps) {

    if (!searchParamas.term) {
        redirect('/')
    }

    return (
        <div className="h-full p-8 max-w-screen-2xl mx-auto">
            <Results term={searchParamas.term} />
        </div>
    )
}
