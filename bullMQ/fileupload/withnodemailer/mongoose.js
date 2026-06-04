const mongoose = require('mongoose');

// PROPERTIES
mongoose.version;                               // '5.13.8' (or whatever version you have installed)
mongoose.connections;                           // [Connection] (array of all connections)
mongoose.connection;                            // Connection (the default connection)
mongoose.models;                                // { [modelName]: Model } (object containing all registered models)
mongoose.Schema;                                // Schema (the Schema constructor)
mongoose.Types;                                 // { ObjectId, ... } (object containing Mongoose types)
mongoose.modelSchema;                           // { [modelName]: Schema } (object containing all registered schemas)
mongoose.Model;                                 // Model (the Model constructor)
mongoose.Document;                              // Document (the Document constructor)
mongoose.Query;                                 // Query (the Query constructor)
mongoose.Aggregate;                             // Aggregate (the Aggregate constructor)
mongoose.mongo;                                 // mongodb (the native MongoDB driver)
mongoose.Collection;                            // Collection (the Collection constructor)
mongoose.Error;                                 // MongooseError (the base error class)
mongoose.MongooseError;                         // MongooseError (alias for the base error class)
mongoose.CastError;                             // CastError (error thrown when a value cannot be cast to the required type)
mongoose.ValidationError;                       // ValidationError (error thrown when validation fails)
mongoose.ValidatorError;                        // ValidatorError (error thrown when a validator fails)
mongoose.VersionError;                          // VersionError (error thrown when a version conflict occurs)
mongoose.DisconnectedError;                     // DisconnectedError (error thrown when trying to use a connection that is disconnected)
mongoose.MissingSchemaError;                    // MissingSchemaError (error thrown when trying to use a model that hasn't been registered with a schema)
mongoose.OverwriteModelError;                   // OverwriteModelError (error thrown when trying to overwrite an existing model)
mongoose.DivergentArrayError;                   // DivergentArrayError (error thrown when trying to save a document with an array that has been modified in place)
mongoose.Error.messages;                        // { [errorType]: { [errorCode]: string } } (object containing default error messages for each error type and code)



//  METHOD
await mongoose.connect(uri, options);           // Connect to MongoDB using the given URI and options Promise<Mongoose>
// url:- mongodb://host:port/database
// Url Example:- mongodb://localhost:27017/shop, mongodb://127.0.0.1:27017/shop, mongodb+srv://username:password@cluster0.mongodb.net/shop
options = {
    dbName: 'shop',                            // Database name to use (overrides the database name in the URI)
    user: 'username',                          // Username for authentication (overrides the username in the URI)
    pass: 'password' ,                         // Password for authentication (overrides the password in the URI)
    authSource: 'admin',                       // Database to authenticate against (default: the database specified in the URI)
    maxPoolSize: 10,                           // Maximum number of connections in the connection pool (default: 100)
    minPoolSize: 0,                            // Minimum number of connections in the connection pool (default: 0)
    serverSelectionTimeoutMS: 5000,            // How long to wait for server selection before throwing an error (default: 30000)
    socketTimeoutMS: 45000,                    // How long to wait for a response from the server before throwing an error (default: 360000)
    family: 4,                                 // Use IPv4 or IPv6 (default: 4)
}

// Connection States
mongoose.connection.readyState;                // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
// Connection States host, name, port, user, pass, client, db, collections, models, config, replica, hosts, options


// Events
mongoose.connection.on('connected', () => {} )                             // Emitted when Mongoose successfully makes its initial connection to the MongoDB server, or when Mongoose reconnects after losing connectivity to the MongoDB server.
mongoose.connection.on('error', (err) => {} )                              // Emitted if an error occurs on a connection, like a failure to connect, or a failure to reconnect after losing connectivity to the MongoDB server.
mongoose.connection.on('disconnected', () => {} )                          // Emitted when Mongoose lost connectivity to the MongoDB server.
mongoose.connection.on('reconnected', () => {} )                           // Emitted when Mongoose successfully reconnects after losing connectivity to the MongoDB server.

// mongoose configuration
mongoose.set(key, value);                                                  // Set a configuration option.  Return value: Mongoose
mongoose.get(key);                                                         // Get the value of a configuration option.  Return value: any

mongoose.set('debug', true);                                               // Enable Mongoose debug mode, which logs the operations Mongoose sends to MongoDB to the console.  Return value: Mongoose
mongoose.set('debug',                                                      // Set a custom debug function.  Return value: Mongoose
    function (collectionName, methodName, ...methodArgs) { 
        console.log(`${collectionName}.${methodName}(${methodArgs.map(a => JSON.stringify(a)).join(', ')})`); 
}); 
mongoose.set("autoIndex", false);                                          // Disable automatic index creation.  Return value: Mongoose
mongoose.set("strict", true);                                             // Disable strict mode.  Return value: Mongoose Secure schema data
mongoose.set("strictQuery", true);                                        // Enable strict mode for queries.  Return value: Mongoose Secure query filters
mongoose.set("runValidators", true);                                      // Enable running validators on update operations.  Return value: Mongoose
mongoose.set("bufferCommands", false);                                    // Disable buffering of commands when the connection goes down.  Return value: Mongoose
mongoose.set("timestamps", true);                                         // Enable automatic creation of createdAt and updatedAt fields on schemas.  Return value: Mongoose
mongoose.set("toJSON", { virtuals: true });                               // Enable virtuals when converting documents to JSON.  Return value: Mongoose
mongoose.set("toObject", { virtuals: true });                             // Enable virtuals when converting documents to plain JavaScript objects.  Return value: Mongoose
mongoose.set("minimize", false);                                          // Disable automatic removal of empty objects.  Return value: Mongoose
mongoose.set("maxTimeMS", 10000);                                         // Set the default maxTimeMS for queries.  Return value: Mongoose

// METHODS
await mongoose.disconnect();                                               // Disconnect from MongoDB  Return value: Promise<void>
await mongoose.createConnection(uri, options);                             // sepatre a url creates a completely separate connection object.  Create a new connection to MongoDB using the given URI and options  Return value: Connection  other same as connrct()

await mongoose.Schema({});                                                 // Create a new schema.  Return value: Schema
const schema = new mongoose.Schema(
    {
        str: {
            type: String,
            required: true,
            trim: true,
            lowerCase: true,
            upperCase: true,
            minlength: 3,
            maxlength: 50,
            match:"/regex/",
            enum: ["admin", "user"],
            default: "guest",
            unique: true,
            index: true,
            spare: true,                                                   // Ignore null value i index
            select: true,
            immulable: true,                                               // cannot be change after creation
            validate: {
                validation: function (v){
                    return v.startsWith("user_")
                },
                message: "Must start with user_"
            },
            alias: "name",
            set: v => v.trim().toLowerCase(),
            get: v => v.toUpperCase(),
            populate: {                                                    // Used with objectId
                ref: "user"
            }
        },
        num: {
            type: Number,
            min: 0,
            max: 1,
            default: 5,
            required: true,
            ...orherStringOptionAdd
        },
        bool: {
            type: Boolean,
            default: true,
            enum: [true, false, 1, 0],
            ...orherStringOptionAdd
        },
        dat: {
            type: Date,
            min: "2024-10-1",
            max: "20250-5-01",
            ...orherStringOptionAdd
        },
        Buffer: {
            type: Buffer
        },
        Object: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        Arr: {
            type: Array,
            type: [mongoose.Schema.Types.String],
            type: [mongoose.Schema.Types.Mixed]
        },
        Mixed: {
            type: mongoose.Schema.Types.Mixed
        },
        Decimal: {
            type: mongoose.Schema.Types.Decimal128
        },
        Map: {                                                            // Dynamic key-value pairs.
            type: Map,
            of: String
        },
        uuid: {
            type: mongoose.Schema.Types.UUID
        },
        BigInt: {

            type: BigInt
        }
    },
    {
        timestamps: true,                                                  // Automatically creates:
        strict: true,                                                      // Controls unknown fields.
        collection: "employees",                                           // Specify collection manually.
        versionKey: false,                                                 // __v disable
        minimize: true,                                                    // Controls empty object removal.
        autoIndex: false,                                                  // Automatically build indexes.
        id: true,                                                          // Virtual string version of _id.
        toJSON: {virtuals: true},                                          // Controls JSON conversion.
        toObject:{virtuals: true},                                         // Controls object conversion.,
        discriminatorKey: "role",                                          // Used by discriminators.
        capped: {size: 1024},                                              // Creates capped collection. MongoDB automatically limits collection size.
        shardKey: {tenantId: 1},                                           // For MongoDB sharding.  Used in large-scale clusters.
        validateBeforeSave: false,                                         // validate Before Save
        optimisticConcurrency: true,                                       //  optimisticConcurrency Prevents overwriting changes accidentally.
        strictQuery: true                                                  // Controls query filtering. Unknown query fields ignored.
    }
);
schema.obj;                                                                // Returns the original schema definition object.  Return value: object
schema.paths;                                                              // An object containing all schema paths.  Return value: { [path: string]: SchemaType }
schema.paths.age;                                                          // Get a specific schema path.  Return value: SchemaType
schema.tree;                                                               // An object containing the schema definition in a tree structure.  Return value: object
schema.options;                                                            // The options passed to the schema.  Return value: object
schema.methods;                                                            // An object containing instance methods.  Return value: { [methodName: string]: Function }
schema.methods.getFullName = function() {                                  // Define an instance method on the schema.  Return value: void
    return this.firstName + ' ' + this.lastName; 
};  
schema.statics;                                                            // An object containing static methods.  Return value: { [methodName: string]: Function }
schema.statics.findByFullName = function(fullName) {                       // Define a static method on the schema.  Return value: void
    const [firstName, lastName] = fullName.split(' '); 
    return this.findOne({ firstName, lastName }); 
};
schema.virtuals;                                                            // An object containing virtual properties.  Return value: { [virtualName: string]: VirtualType }
schema.virtual('fullName').get(function() {                                 // Define a virtual property on the schema.  Return value: VirtualType
    return this.firstName + ' ' + this.lastName; 
}).set(function(fullName) { 
    const [firstName, lastName] = fullName.split(' '); 
    this.firstName = firstName; 
    this.lastName = lastName; 
});
schema.index(fields, options);                                              // Define an index on the schema.  Return value: void
schema.index({email: 1}, { unique: true });                                 // Define a unique index on the email field.  Return value: void
schema.pre(method, callback);                                               // Define a pre hook for the given method.  Return value: void
schema.post(method, callback);                                              // Define a post hook for the given method.  Return value: void
schema.plugin(plugin, options);                                             // Apply a plugin to the schema.  Return value: void
schema.alias(path);                                                         // Define an alias for a path.  Return value: void
schema.childSchemas;                                                        // An array of child schemas.  Return value: { schema: Schema, model: Model, discriminatorMapping: object }[]
schema.query;                                                               // An object containing query helper methods.  Return value: { [methodName: string]: Function }
schema.query.byName = function(name) {                                      // Define a query helper method on the schema.  Return value: void
    return this.where({ name: new RegExp(name, 'i') }); 
};

// SCHEMA METHODS
schema.add(Object);                                                         // Add a path to the schema.  Return value: void Ex:- schema.add({ age: Number });
// EX:- 
schema.add({name: String, age: Number, address: {city: String}});           // schema add a new field add a string number boolean
schema.add({skills: [String], profile: [                                    // schema add a new field add a array
    {name: String, url: String}
], address: addresSchema
})                  

schema.path("name");                                                        // Get information about a schema field
const namePath = schema.path("name");                                       // amePath all properties and method
namePath.instance                                                           // return type name
namePath.path;                                                              // return filed name 
namePath.options;                                                           // return field configuration
namePath.validators;                                                        // return validation
namePath.defaultValue;                                                      // return a default value
namePath.isRequired;                                                        // return a required value true.false
namePath.path("age").validate(                                              // Dynamic Validator Addition
    value => value + 10, "Age must br 19"
)
namePath.enumValues                                                         // Enum Inspection
// string schema type method
const stringPath = namePath.path("name")
stringPath.enum();
stringPath.match();
stringPath.minlength();
stringPath.maxlength();
stringPath.trim();
stringPath.lowerCase();
stringPath.upperCase();
// number schema type method
const numberPath = namePath.path("age");
numberPath.min();
numberPath.max();
// Date schema type method
const datePath = schema.path("createAT");
datePath.min();
datePath.max();

schema.remove([path])                                                             // Is deprecated/removed. Historically, it was used to remove paths (fields) from a schema definition.
schema.remove(["age", "email"])                                                   // syntax eample

schema.clone()                                                                    // create  deeps copies os a mongoose schema   -- Return:- schema

schema.pick(paths)                                                                // creates a new Schema that contains only the specified paths (fields) from an existing schema. It does not modify the original schema.
schema.pick(["name", "age"])                                                      // syntax example

schema.omit(paths);                                                               // creates a new schema by removing specified fields from an existing schema. It is the opposite of schema.pick().
schema.omit(["name", "age", "passwprd"])                                          // suntax example

schema.eachPath((path, schemaType) => {                                           //is a Schema method that iterates over every path (field) defined in a schema.
    type.path
    type.instance
    type.options
    type.validators
    type.defaultValue
});     

schema.set(optionsName, value);                                                   // is used to get or set schema options after a schema has been created.
optionsName = {
    timestamps: true,                                                             // Automatically creates:
    strict: true,                                                                 // Controls unknown fields.
    collection: "employees",                                                      // Specify collection manually.
    versionKey: false,                                                            // __v disable
    minimize: true,                                                               // Controls empty object removal.
    autoIndex: false,                                                             // Automatically build indexes.
    id: true,                                                                     // Virtual string version of _id.
    toJSON: {virtuals: true},                                                     // Controls JSON conversion.
    toObject:{virtuals: true},                                                    // Controls object conversion.,
    discriminatorKey: "role",                                                     // Used by discriminators.
    capped: {size: 1024},                                                         // Creates capped collection. MongoDB automatically limits collection size.
    shardKey: {tenantId: 1},                                                      // For MongoDB sharding.  Used in large-scale clusters.
    validateBeforeSave: false,                                                    // validate Before Save
    optimisticConcurrency: true,                                                  //  optimisticConcurrency Prevents overwriting changes accidentally.
    strictQuery: true                                                             // Controls query filtering. Unknown query fields ignored.
}
schema.set(optionName, value)                                                     // Using Multiple
       .set(optionName, value)
       .set(optionName, value)

schema.get(optionName);                                                           // is used to retrieve (read) schema options from a Mongoose Schema.


// MODELS
await mongoose.model(name);                                               // Retrieve a model by name.  Return value: Model
await mongoose.model(name, schema);                                       // Compile a model from a schema.  Return value: Model                                                          // The prototype of the model.  Return value: object
await mongoose.model(name, schema, collection);                           // Compile a model from a schema and specify the collection name.  Return value: Model
// collectionName:- Custom Collection Name 
await mongoose.modelNames();                                              // Return an array of model names created on this connection.  Return value: string[]
await mongoose.deleteModel(modelName);                                    // Delete a model from Mongoose.  Return value: void

await mongoose.pluralize();                                               // Get the current pluralization function.  Return value: Function
await mongoose.pluralize(null);                                           // Disable automatic pluralization of collection names.  Return value: void
await mongoose.pluralize(function (name) { return name + 's'; });         // Set a custom pluralization function.  Return value: void

const User = mongoose.model('User', userSchema); 
User.modelName;                                                           // The name of the model.  Return value: string
User.collection.name;                                                     // The name of the collection the model uses.  Return value: string
User.db;                                                                  // The database the model uses.  Return value: Db
User.base;                                                                // The base Mongoose instance the model uses.  Return value: Mongoose
User.schema;                                                              // The schema the model uses.  Return value: Schema
User.prototype; 
User.schema;
User.modelName;


// Mongoose
//    │
//    └── Model (User)
//             │
//             ├── Create Operations
//             ├── Read Operations
//             ├── Update Operations
//             ├── Delete Operations
//             ├── Aggregate Operations
//             ├── Bulk Operations
//             ├── Index Operations
//             ├── Transaction Operations
//             └── Utility Operations

// METHOD           
User.create(doc, options);                                                         // Create one or multiple documents.
User.craete([doc1, doc2], options);                                                // doc:- Array/Object | optios:- Object
options = {
    session,                                                                       // already know
    validateBeforeSave,                                                            // Controls schema validation before saving. default: true and false Use Case Rarely used.  Mostly:  Data migration Import scripts Legacy databases       
    ordered,                                                                       // Only applies when inserting multiple documents.  (Mongoose create() behaves differently than insertMany, but supports ordered processing)
    aggregateErrors                                                                // Only works with: orderes: false default value:- false -> Returns first error only. true -> Returns combined errors.
}










await mongoose.startSession();                                            // Start a new session.  Return value: Promise<ClientSession>
const session = await mongoose.startSession();                            // Start a new session.  Return value: Promise<ClientSession>
// properties on session
session.id;                                                               // The session ID.  Return value: ObjectId
session.client;                                                           // The MongoClient this session belongs to.  Return value: MongoClient
session.hasEnded;                                                         // Whether this session has ended.  Return value: boolean
// methods on session
session.startTransaction();                                               // Start a transaction on this session.  Return value: Promise<void>
session.commitTransaction();                                              // Commit the transaction on this session.  Return value: Promise<void>
session.abortTransaction();                                               // Abort the transaction on this session.  Return value: Promise<void>
session.endSession();                                                     // End this session.  Return value: void
session.withTransaction(async () => {} );                                 // Execute the given function in a transaction.  Return value: Promise<void>
await mongoose.connection.transaction(async (session) => {} );            // Execute the given function in a transaction.  Return value: Promise<void>