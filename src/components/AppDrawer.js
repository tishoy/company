// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import List from 'material-ui/List';
import Toolbar from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import AppDrawerNavItem from 'training/src/components/AppDrawerNavItem';
import Link from 'training/src/components/Link';
import Config from '../config';

import { APP_TYPE_COMPANY, APP_TYPE_ORANIZATION } from "../enum";

const styleSheet = createStyleSheet('AppDrawer', theme => ({
  paper: {
    width: 150,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.primary[500],
    },
  },
  toolbar: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  anchor: {
    color: theme.palette.text.secondary,
  },
}));

function renderNavItems(props, navRoot) {
  let navItems = null;

  if (navRoot.childRoutes && navRoot.childRoutes.length) {
    // eslint-disable-next-line no-use-before-define
    navItems = navRoot.childRoutes.reduce(reduceChildRoutes.bind(null, props), []);
  }

  return (
    <List>
      {navItems}
    </List>
  );
}

function reduceChildRoutes(props, items, childRoute, index) {
  if (childRoute.nav) {
    if (childRoute.childRoutes && childRoute.childRoutes.length) {
      const openImmediately = props.routes.indexOf(childRoute) !== -1 || false;
      items.push(
        <AppDrawerNavItem key={index} openImmediately={openImmediately} title={childRoute.title}>
          {renderNavItems(props, childRoute)}
        </AppDrawerNavItem>,
      );
    } else {
      items.push(
        <AppDrawerNavItem
          key={index}
          title={childRoute.title}
          to={childRoute.path}
          onClick={props.onRequestClose}
        />,
      );
    }
  }
  return items;
}

function AppDrawer(props) {
  const classes = props.classes;

  return (
    <Drawer
      className={props.className}
      classes={{
        paper: classes.paper,
      }}
      open={props.open}
      onRequestClose={props.onRequestClose}
      docked={props.docked}
      keepMounted
    >
      <div className={classes.nav}>
        <Toolbar className={classes.toolbar + ' nyx-logo'}>
          <Typography type="title" gutterBottom color="inherit">
            {sessionStorage.getItem("apptype") === APP_TYPE_COMPANY.toString() ? "企业登录" : "机构登录"}
          </Typography>
          <div>{"v." + Config.version}</div>
          {
            /**<Link className={classes.title} to="/" onClick={props.onRequestClose}>
            
          </Link>*/
          }
          <Divider absolute />
        </Toolbar>
        {renderNavItems(props, props.routes[0])}
      </div>
      
      <div 
      style={{position:"fixed",bottom:"0",fontSize:"16px",width:"100%"}}
      >
      {sessionStorage.getItem("apptype") === APP_TYPE_COMPANY.toString() ? <a className="nyx_instruction_pdf nyx_instruction_pdf_big"  title="自学资料" href="http://www.csst.com.cn/uploadfile/doc/details.rar" target="view_window"><i className="glyphicon glyphicon-list-alt"></i><p className="nyx_instruction_p">自学资料</p></a> : ""}
      {sessionStorage.getItem("apptype") === APP_TYPE_COMPANY.toString() ? <a className="nyx_instruction_pdf"  title="填报说明" href="http://www.csst.com.cn/uploadfile/doc/csi-01.pdf" target="view_window"><i className="glyphicon glyphicon-info-sign"></i><p className="nyx_instruction_p">填报说明</p></a> : ""}
      {sessionStorage.getItem("apptype") === APP_TYPE_COMPANY.toString() ? <a className="nyx_instruction_pdf"  title="常见问题与回答" href="http://www.csst.com.cn/uploadfile/doc/csi-Q&A.pdf" target="view_window"><i className="glyphicon glyphicon-question-sign"></i><p className="nyx_instruction_p">Q&A</p></a> : ""}
      
      
      </div>
    </Drawer>
  );
}

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  docked: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  routes: PropTypes.array.isRequired,
};

export default withStyles(styleSheet)(AppDrawer);
