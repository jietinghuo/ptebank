// PTE Practice Bank License Validator (Cloudflare Worker)
// 部署后把 Creem API Key 和 DATA_KEY 填入环境变量：
//   env: CREEM_API_KEY=<你的 Creem API key>, DATA_KEY=<data_key_b64>
const CREEM_VALIDATE = "https://api.creem.io/v1/licenses/validate";
const PRODUCTS = {
  "prod_1eYMSUyL2lCqWVajGS1SDG": "speaking",
  "prod_3UudltkZ7Ceg5EAzfIMPNQ": "writing",
  "prod_lBoy1pG9mhtQUABEbfPVt": "complete"
};

export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response(JSON.stringify({error: "POST only"}), {status: 405, headers: {"Content-Type": "application/json"}});
    }
    const { key } = await request.json().catch(() => ({}));
    if (!key) return new Response(JSON.stringify({valid: false, error: "no key"}), {headers: {"Content-Type": "application/json"}});

    const r = await fetch(CREEM_VALIDATE, {
      method: "POST",
      headers: {"Content-Type": "application/json", "x-api-key": env.CREEM_API_KEY},
      body: JSON.stringify({key})
    });
    const data = await r.json();
    const status = data && data.status;
    const pid = data && data.product_id;
    if (status !== "active") {
      return new Response(JSON.stringify({valid: false, status}), {headers: {"Content-Type": "application/json"}});
    }
    const plan = PRODUCTS[pid];
    if (!plan) return new Response(JSON.stringify({valid: false, error: "unknown product"}), {headers: {"Content-Type": "application/json"}});

    return new Response(JSON.stringify({valid: true, plan, data_key: env.DATA_KEY}), {
      headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"}
    });
  }
};
