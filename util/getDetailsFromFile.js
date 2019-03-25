/**
 * Get File details
 * Ref: https://github.com/winstonjs/winston/issues/197
 * @param {Error.stack} errorStack
 */
const getDetailsFromFile = (errorStack) => {
    const fileAndRow = errorStack
    .split('at ').pop()
    .split('(').pop()
    .replace(')', '')
    .replace('\n', '')
    .split(':')

    const detailsFromFile = {
        file: fileAndRow[0].trim(),
        line: fileAndRow[1],
        row: fileAndRow[2]
    }

    return detailsFromFile
}

module.exports = getDetailsFromFile
