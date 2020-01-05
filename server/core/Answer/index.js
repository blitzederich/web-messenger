const Warnings = require('./Warnings.json');

/**
 * Prepares a response object.
 * 
 * @typedef {{
 *  status: boolean
 *  data: object
 * }} AnswerResult
 *
 * @param {boolean} status result operation status.
 * @param {object|string} dataObjectOrWarningCode result data object or warning code.
 * @param {object} error error object.
 * 
 * @returns {AnswerResult} prepared answer object.
 */

const Answer = (status, dataObjectOrWarningCode, error) => {
    if (!status) {

        let warningCode = dataObjectOrWarningCode;

        let warning = {
            code: warningCode,
            text: Warnings[ warningCode ]
        };

        error = error || '';

        if (error === '') return { status, warning };

        error = {
            text: error.toString(),
            stackTrace: error
        };

        return { status, warning, error };
        
    }

    let data = dataObjectOrWarningCode;
    return { status, data }
}

module.exports = Answer;