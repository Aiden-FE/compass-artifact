import {
  recommended, recommendedReact, recommendedTs, recommendedVue3,
} from './rules';

export default {
  rules: {},
  configs: {
    recommended,
    'recommended-react': recommendedReact,
    'recommended-vue3': recommendedVue3,
    'recommended-ts': recommendedTs,
  },
};
