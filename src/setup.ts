import { User } from './models/User';

(async() => {
  await User.sync({ force: true });
})();
