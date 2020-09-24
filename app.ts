import { Application, Context, renderFile} from './deps.ts'

const title = 'dft';
const app = new Application();

app
  .renderer = {
    render<T>(name: string, data: T): Promise<Deno.Reader> {
      return renderFile(name, data);
    },
  };

app
  .get("/", async (c: Context) => {
    await c.render(
      "./index.html", {
      title: title
    });
  })
  .post("/", async (c: Context) => {
    try {
      // abcでのbody取得
      const data = await c.body as {
        first: string;
        second: string;
      };
      return Object.values(data).every(value => !!value)
        ? data : c.redirect("/");
    } catch (error) {
      return c.json(error, 500);
    }
  })
  .start({ port: 8080 });