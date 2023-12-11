import { Icon } from '@edx/paragon';
import { House, Star, InsertDriveFile } from '@edx/paragon/icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DirectPluginSlot } from '@edx/frontend-plugin-framework/src/plugins/directPlugins';

const defaultLinks = [
  {
    id: 'home',
    priority: 5,
    content: { url: '/', icon: House, label: 'Home' },
  },
  {
    id: 'lookup',
    priority: 25,
    content: { url: '/lookup', icon: Star, label: 'Lookup' },
  },
  {
    id: 'drafts',
    priority: 35,
    content: { url: '/drafts', icon: InsertDriveFile, label: 'Drafts' },
  },
];

const LeftSidebar = () => (
  <div>  {/* TODO: find utility classes to put this absolute in the top left corne */}
    {/* Site Logo */}
    {/* Search box */}
    {/* Main navigation links: */}
    <DirectPluginSlot
      slotId="side-bar-nav"
      defaultContents={defaultLinks}
      renderWidget={(link) => (
        <a
          href={link.content.url}
          key={link.id}
        >
          <Icon src={link.content.icon} /> {link.content.label}
        </a>
      )}
    />
  </div>
);

export default LeftSidebar;
