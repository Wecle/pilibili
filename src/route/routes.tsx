import Home from "@/components/Pages/Home";
import Cover from "@/components/Pages/Cover"
import { URLS } from "@/constants/urls";
import { FC } from "react";
import { Navigate, useRoutes } from "react-router";

interface Props
{
	navigate?: string;
}

const Routes: FC<Props> = (props) =>
{
	const { navigate } = props

	const element = useRoutes([
		{
			path: '/',
			element: <Cover />
		},
		{
			path: URLS.HOME,
			element: <Home />
		}
	])

	return element
}

export default Routes
