import { GlobalRegistrator } from '@happy-dom/global-registrator';

process.env['SKIP_ENV_VALIDATION'] = 'true';

GlobalRegistrator.register();
