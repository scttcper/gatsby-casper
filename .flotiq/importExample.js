const dotenv = require(`dotenv`)
dotenv.config()
const fetch = require(`node-fetch`)
const assert = require(`assert`).strict
const path = require(`path`)
const fs = require(`fs`)
const FormData = require(`form-data`)

let headers = {
    accept: `application/json`,
}
let apiUrl

const directoryImagePath = path.join(__dirname, `images`)
const directoryPath = path.join(__dirname, ``)

exports.importExamples = async () => {
    apiUrl = process.env.GATSBY_FLOTIQ_BASE_URL
    assert.ok(apiUrl,`You must specify API url (in most cases it is "https://api.flotiq.com")`)
    headers[`X-AUTH-TOKEN`] = process.env.GATSBY_FLOTIQ_API_KEY
    assert.ok(process.env.GATSBY_FLOTIQ_API_KEY,`You must specify API token, preferably Read and write Application API key (if you don't know what it is check: https://flotiq.com/docs/API/)`)

    let imageToReplace = []
    let imageForReplacing = {}

    let files = fs.readdirSync(directoryImagePath)
    await Promise.all(files.map(async function (file) {
        let fileId = file.replace(`.jpg`, ``);
        fileId = fileId.replace(`.png`, ``);
        imageToReplace.push(fileId)
        let image = await fetch(apiUrl + `/api/v1/content/_media?filters={"fileName":{"filter":"` + file + `","type":"contains"}}`, { headers: headers })
        if (image.ok) {
            image = await image.json()
            if (image.count) {
                imageForReplacing[fileId] = image.data[0].id
            } else {
                const form = new FormData()
                form.append(`file`, fs.createReadStream(directoryImagePath + `/` + file), file)
                form.append(`type`, `image`)
                let json = await fetch(apiUrl + `/api/media`, {
                    method: `POST`,
                    body: form,
                    headers: headers,
                }).then(res => res.json())
                let res = await fetch(apiUrl + `/api/v1/content/_media`, {
                    method: `POST`,
                    body: JSON.stringify(json),
                    headers: { ...headers, 'Content-Type': `application/json` },
                })
                if (res.status === 403) {
                    assert.ok(false, `Please provide correct API key (Read and write Application API key)`)
                }
                imageForReplacing[fileId] = json.id
            }
        } else {
            if (image.status === 403) {
                assert.ok(false, `Please provide correct API key (Read and write Application API key)`)
            }
        }
    }))
    let directories = fs.readdirSync(directoryPath)
    for (let i = 0; i < directories.length; i++) {
        const directory = directories[i];
        if(directory.indexOf(`ContentType`) === 0) {
            let contentDefinition = require(directoryPath + `/` + directory + `/ContentTypeDefinition.json`)
            let contentTypeDefinitionResponse = await fetch(apiUrl + `/api/v1/internal/contenttype/` + contentDefinition.name, { headers: headers })
            if (!contentTypeDefinitionResponse.ok) {
                if (contentTypeDefinitionResponse.status === 404) {

                    let res = await fetch(apiUrl + `/api/v1/internal/contenttype`, {
                        method: `POST`,
                        body: JSON.stringify(contentDefinition),
                        headers: {...headers, 'Content-Type': `application/json`},
                    })
                    if (res.status === 403) {
                        assert.ok(false, `Please provide correct API key (Read and write Application API key)`)
                    }
                } else if (contentTypeDefinitionResponse.status === 403) {
                    assert.ok(false, `Please provide correct API key (Read and write Application API key)`)
                }
            }

            files = fs.readdirSync(directoryPath + '/' + directory)
            await Promise.all(files.map(async function (file) {
                if (file.indexOf(`contentObject`) === 0) {
                    let contentObject = require(directoryPath + '/' + directory + `/` + file)
                    let id = contentObject.id
                    let res = await fetch(apiUrl + `/api/v1/content/` + contentDefinition.name + `/` + id, {method: `HEAD`, headers: headers})
                    let method = `POST`
                    let url = apiUrl + `/api/v1/content/` + contentDefinition.name
                    if (res.status === 403) {
                        assert.ok(false, `Please provide correct API key (Read and write Application API key)`)
                    }
                    if (res.ok) {
                        method = `PUT`
                        url += `/` + id
                    }
                    contentObject = JSON.stringify(contentObject)
                    imageToReplace.forEach((image, index) => {
                        let regex = new RegExp(image, 'g')
                        contentObject = contentObject.replace(regex, imageForReplacing[image])
                    })
                    res = await fetch(url, {
                        method: method,
                        body: contentObject,
                        headers: {...headers, 'Content-Type': `application/json`},
                    })
                    if (res.status === 403) {
                        assert.ok(false, `Please provide correct API key (Read and write Application API key)`)
                    }
                    return res;
                }
            }))
        }
    }
}

exports.importExamples()
