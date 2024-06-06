'use client'
import { useRouter } from 'next/navigation';

const router = useRouter();

export const goToArticle = (url) => {
    router.push(url);
}
export const goToPage = () => {
    router.push(url);
}