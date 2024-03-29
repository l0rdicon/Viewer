import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const stickyClasses = 'sticky top-0';
const notStickyClasses = 'relative';

const NavBar = ({ className, children, isSticky }) => {
  return (
    <div
      className={classnames(
        'bg-secondary-dark z-20 flex flex-row items-center border-b-4 border-black px-1',
        isSticky && stickyClasses,
        !isSticky && notStickyClasses,
        className
      )}
      id={'top-nav-fancy'}
      style={{ paddingTop: '2px', paddingBottom: '2px', minHeight: '5%' }}
    >
      {children}
    </div>
  );
};

NavBar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  isSticky: PropTypes.bool,
};

export default NavBar;
