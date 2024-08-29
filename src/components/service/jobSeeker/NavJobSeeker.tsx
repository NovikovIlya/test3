import { useLocation } from 'react-router-dom'

import { Header } from '../../layout/Header'
import { WrapperForServices } from '../../wrapperForServices/WrapperForServices'

import Catalog from './Catalog'
import VacancyView from './VacancyView'

export const NavJobSeeker = () => {
	const { pathname } = useLocation()
	return (
		<>
			<Header type="service" service="jobSeeker" />
			<WrapperForServices>
				{pathname.includes('/services/jobseeker/catalog') && <Catalog />}
				{pathname.includes('/services/jobseeker/vacancyview') && (
					<VacancyView type="CATALOG" />
				)}
			</WrapperForServices>
		</>
	)
}
