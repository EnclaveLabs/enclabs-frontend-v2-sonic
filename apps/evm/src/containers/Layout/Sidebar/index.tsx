import { useTranslation } from 'react-i18next';

import { routes } from 'constants/routing';
import useGetMenuItems from 'containers/Layout/useGetMenuItems';
import { Link } from 'containers/Link';
import { NavLink } from './NavLink';
import { GradientBorder } from 'components/GradientBorder';
import { Icon } from 'components';

export const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const menuItems = useGetMenuItems();

  return (
    <GradientBorder className="hidden md:flex md:flex-col md:items-center md:w-20 xl:w-56 rounded-none p-0 pr-[7px]">
      <div className="bg-cards hidden pt-7 md:flex md:flex-col md:items-center md:w-20 xl:w-56 h-full">
        <Link
          className="mb-4 flex flex-col w-full items-center justify-center py-2"
          to={routes.dashboard.path}
        >

          <Icon name='enclabs' className='h-9 xl:hidden'/>
          
          <Icon name='enclabsWithText' className='hidden h-16 xl:block' />

        </Link>

        <div className="flex-1 overflow-auto px-3 py-6 xl:w-full xl:px-0">
          {menuItems.map(menuItem => (
            <NavLink key={menuItem.i18nKey} {...menuItem} />
          ))}
        </div>
      </div>
    </GradientBorder>
  );
};
