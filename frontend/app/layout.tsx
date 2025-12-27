import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ReactQueryProvider from '~/common/lib/reactQueryProvider';
import { CartProvider } from '~/contextProviders/provider';
import { Toaster } from 'sonner';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'E-Commerce Store',
	description: 'Frontend setup for Uniblox assignment',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ReactQueryProvider>
					<CartProvider>
						{children}
						<Toaster />
					</CartProvider>
				</ReactQueryProvider>
			</body>
		</html>
	);
}
