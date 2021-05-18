import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

// Workflow
import workflowMetadata from './workflow/metadata';

// Documents
import homePage from './documents/homePage';
import page from './documents/page';
import foundation from './documents/foundation';
import component from './documents/component';
import content from './documents/content';
import pattern from './documents/pattern';
import brand from './documents/brand';
import resource from './documents/resource';
import update from './documents/update';
import menu from './documents/menu';
import headerSettings from './documents/headerSettings';
import footerSettings from './documents/footerSettings';

// Modules
import grid from './modules/grid';
import gridColumn from './modules/gridColumn';

// Objects
import blockContent from './objects/blockContent';
import author from './objects/author';
import horizontalRule from './objects/horizontal-rule';
import navPage from './objects/navPage';
import navLink from './objects/navLink';
import homeHero from './objects/homeHero';

export default createSchema({
  name: 'matchbox',
  types: schemaTypes.concat([
    // Workflow metadata
    workflowMetadata,

    // Documents
    homePage,
    page,
    foundation,
    component,
    content,
    pattern,
    brand,
    resource,
    update,
    menu,
    headerSettings,
    footerSettings,

    // Modules
    grid,
    gridColumn,

    // Objects
    author,
    blockContent,
    horizontalRule,
    navPage,
    navLink,
    homeHero
  ])
});
