// const translate = require("google-baidu-translate-api");
const translate = require('@iamtraction/google-translate');
 
exports.index = (req, res) => {
	return res.json({
		status: true,
		data: {
			maintainer: 'Azhari Muhammad M <azhari.marzan@gmail.com>',
			source: 'https://github.com/azharimm/api-translate',
			endpoint: 'https://apikidy-translate1.herokuapp.com/?engine={engine}&text={text}&to={to}',
			example: 'https://apikidy-translate1.herokuapp.com/translate?engine=google&text=Welcome&to=id'
		}
	})
}
exports.trans = async (req, res) => {
	try {
		const engine = req.query.engine;
		const text = req.query.text;
		let to = req.query.to;
		let result;
		if (engine != "google" && engine != "baidu") {
			throw new Error(
				"Please specify translate engine either google or baidu"
			);
			next();
        }
        
        if(text == null || text == '' || text == undefined) {
            throw new Error(
				"Text query cannot be null"
			);
			next();
        }

        if(to == null || to == '' || to == undefined) {
            to = "en";
        }

		result = await translate(`${text}`, { to });
		console.log(result);
		return res.status(200).json({
			status: true,
			message: "success",
			data: {
				origin: result.from.language.iso,
				result: result.text,
				targets: [],
			},
		});
	} catch (error) {
		res.status(500).json(
			{
				status: false,
				message: "Server error: ",
				data: {
					error: error.message,
				},
			},
		);
	}
};
