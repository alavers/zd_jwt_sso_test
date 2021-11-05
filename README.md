# JWT SSO Test App

1. Go read [this guide](https://support.zendesk.com/hc/en-us/articles/4408845838874-Enabling-JWT-JSON-Web-Token-single-sign-on).
1. Get your shared secret from `https://your_subdomain.zendesk.com/admin/account/security/sso`
1. Rename `.env.sample` to `.env` and put your shared secret in it
1. `npm ts:watch` in one window
1. `npm dev` in another
