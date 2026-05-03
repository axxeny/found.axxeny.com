# DNS Handoff

Target domain: `found.axxeny.com`

## GitHub Pages

1. Push this repository to GitHub under the `axxeny` account or organisation.
2. In GitHub, open repository `Settings` -> `Pages`.
3. Under `Build and deployment`, choose `Deploy from a branch`.
4. Select branch `main` and folder `/`, then save.
5. Under `Custom domain`, set `found.axxeny.com`.
6. Keep the root `CNAME` file in this repo with exactly:

   ```text
   found.axxeny.com
   ```

GitHub recommends verifying custom domains to reduce takeover risk. For a personal account, go to profile `Settings` -> `Pages` -> `Add a domain`, add `axxeny.com`, then create the TXT record GitHub shows. Keep that TXT record after verification.

## Cloudflare DNS

In Cloudflare zone `axxeny.com`, create:

| Type | Name | Target | Proxy status | TTL |
| --- | --- | --- | --- | --- |
| `CNAME` | `found` | `axxeny.github.io` | DNS only | Auto |

Use `DNS only` first. After GitHub Pages provisions HTTPS successfully, keep it DNS-only unless there is a specific Cloudflare feature you need in front of GitHub Pages.

Do not add wildcard records such as `*.axxeny.com` for this setup.

## Verify

DNS can take up to 24 hours to propagate.

```sh
dig found.axxeny.com CNAME +short
dig found.axxeny.com +short
curl -I https://found.axxeny.com/
```

Expected CNAME target:

```text
axxeny.github.io.
```

## Sources

- GitHub Docs: [Configuring a publishing source for your GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- GitHub Docs: [Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- GitHub Docs: [Verifying your custom domain for GitHub Pages](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
- Cloudflare Docs: [CNAME flattening](https://developers.cloudflare.com/dns/cname-flattening/)
