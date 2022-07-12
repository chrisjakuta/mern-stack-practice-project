#!/usr/bin/env node
/*
Definition of Collections for MongoDB client
 */

const fs = require('fs')
const { client } = require('../app')

class CreateCollections {
    constructor() {
        this.mongoDBClient = client
        this.filesList = null
        this.pathToDocs = '/Users/jakuta/dev/mern-stack-practice-project/documents/'
        this.assignFiles()
        this.createCollections(this.mongoDBClient)
    }

    get files () {
        return this.filesList
    }

    set files (value) {
        this.filesList = value
    }

    get path () {
        return this.pathToDocs
    }
    set path (value) {
        this.pathToDocs = value
    }

    assignFiles () {
        fs.readdir(this.path, (err, files) => {
            if (err) {
                console.log(err)
            }
            if (files) {
                console.log(files)
                this.files = files
            }
        })
    }

    async createCollections (client) {
        try {
            await client.connect()
                .then((connection) => {
                    const db = connection.db('nerd-rich-mongodb')
                    this.files.forEach(element => {
                        element = element.strip('.txt')
                        db.createCollection(element)
                    })
                    let collections = db.collections()
                    console.log(collections)
                })
        } catch (e) {
            console.error(e)
        } finally {
            client.close()
        }
    }

}

class DBCollection {
    constructor() {
    }
}

collections = new CreateCollections()

