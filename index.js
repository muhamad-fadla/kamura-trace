const Fastify = require('fastify');
const axios = require('axios');

const routes = (fastify) => {


	fastify.get('/', (req,reply) => {
		reply.send({
			status: 'ok'
		})
	})


	fastify.get('/search', async(req,res) => {

		console.log(req.query.url)

		let response = await axios.get(`https://api.trace.moe/search?url=${encodeURIComponent(req.query.url)}`);

		res.send(response.data);
	})

}


const Build = () => {
	let fastify = Fastify();

	routes(fastify);

	return fastify;
}

let PORT = process.env.PORT || 3030;

Build().listen(PORT, '0.0.0.0', (e) => {
	if(e){
		console.error(e)
		return;
	}

	console.log(`Server running on PORT: ${PORT}`)
});