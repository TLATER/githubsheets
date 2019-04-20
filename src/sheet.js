const toml = require("toml");

const style = require("./styles/sheet.scss");
const sheet_template = require("./templates/sheet.handlebars");

class Sheet {
    constructor(file) {
        self._data = toml.parse(file);
        for (const [ability, score] of Object.entries(self._data.ability_scores)) {
            self._data.ability_scores[ability + "_modifier"] = (score - 10) / 2;
        }
    }

    render() {
        return sheet_template({character: self._data});
    }
}

module.exports = Sheet;
