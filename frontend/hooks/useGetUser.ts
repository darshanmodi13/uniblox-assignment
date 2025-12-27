import { useEffect, useState } from 'react';

export const useGetUser = () => {
	const [user, setUser] = useState('');

	useEffect(() => {
		const user = localStorage.getItem('user') ?? Date.now().toString();
		localStorage.setItem('user', user);
		setUser(user);
	}, []);

	return user;
};
