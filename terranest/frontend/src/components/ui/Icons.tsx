import React from 'react';
import { 
  FaLeaf, 
  FaTwitter, 
  FaFacebook, 
  FaInstagram, 
  FaLinkedin, 
  FaBars, 
  FaUsers, 
  FaChartLine, 
  FaUser, 
  FaTree 
} from 'react-icons/fa';

const renderIcon = (Icon: any, className?: string) => {
  return Icon ? Icon({ className }) : null;
};

export const LeafIcon = ({ className }: { className?: string }) => (
  <div className={className}>
    {renderIcon(FaLeaf)}
  </div>
);

export const TwitterIcon = ({ className }: { className?: string }) => (
  <div className={className}>
    {renderIcon(FaTwitter)}
  </div>
);

export const FacebookIcon = ({ className }: { className?: string }) => (
  <div className={className}>
    {renderIcon(FaFacebook)}
  </div>
);

export const InstagramIcon = ({ className }: { className?: string }) => (
  <div className={className}>
    {renderIcon(FaInstagram)}
  </div>
);

export const LinkedinIcon = ({ className }: { className?: string }) => (
  <div className={className}>
    {renderIcon(FaLinkedin)}
  </div>
);

export const BarsIcon = ({ className }: { className?: string }) => (
  <div className={className}>
    {renderIcon(FaBars)}
  </div>
);

export const UsersIcon = ({ className }: { className?: string }) => (
  <div className={className}>
    {renderIcon(FaUsers)}
  </div>
);

export const ChartLineIcon = ({ className }: { className?: string }) => (
  <div className={className}>
    {renderIcon(FaChartLine)}
  </div>
);

export const UserIcon = ({ className }: { className?: string }) => (
  <div className={className}>
    {renderIcon(FaUser)}
  </div>
);

export const TreeIcon = ({ className }: { className?: string }) => (
  <div className={className}>
    {renderIcon(FaTree)}
  </div>
);
