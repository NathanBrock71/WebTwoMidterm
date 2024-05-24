import { Injectable } from '@angular/core';
import { MongoClient, ObjectId } from 'mongodb';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  constructor() { }

  getMovieById() {
    var db = new DBActions();
    return db.Find('573a1390f29313caabcd42e8');
  }
}

class DBActions {
  private connectionString = 'mongodb+srv://nbrockn71:Brockn71@midtermdb.ibmb36t.mongodb.net/sample_mflix?retryWrites=true&w=majority'; // Replace with your actual API URL
  private client;

  constructor() {
    this.client = new MongoClient(this.connectionString);
    console.log(this.client);
  }

  private async dbConnect() {
    try {
      await this.client.connect();
    } catch (e) {
      console.error(e);
    }
  }

  private async dbDisconnect() {
    try {
      await this.client.close();
    } catch (e) {
      console.error(e);
    }
  }

  public async Find(id: string) {
    this.dbConnect;
    const result = await this.client.db('sample_mflix').collection('movies').findOne({ '_id': new ObjectId(id), 'x': 1 })
    this.dbDisconnect;

    if (result) {
      console.log(`Found a listing in the collection with the id: '${id}':`);
      console.log(result);
    } else {
      console.log(`No listings found with the id '${id}'`);
    }
  }


  public async findAll() {
    await this.dbConnect();
    const results = await this.client.db('sample_mflix').collection('movies').find().toArray();
    await this.dbDisconnect();

    if (results.length > 0) {
      console.log('Found movies in the collection:');
      console.log(results);
    } else {
      console.log('No movies found in the collection');
    }

    return results;
  }

  public async create(movie: any) {
    await this.dbConnect();
    const result = await this.client.db('sample_mflix').collection('movies').insertOne(movie);
    await this.dbDisconnect();

    console.log('Movie added:', result.insertedId);
    return result.insertedId;
  }

  public async edit(id: string, updatedMovie: any) {
    await this.dbConnect();
    const result = await this.client.db('sample_mflix').collection('movies').updateOne({ '_id': new ObjectId(id) }, { $set: updatedMovie });
    await this.dbDisconnect();

    if (result.modifiedCount > 0) {
      console.log(`Movie with id '${id}' updated successfully`);
    } else {
      console.log(`No movie found with id '${id}', no updates were made`);
    }
  }

  public async delete(id: string) {
    await this.dbConnect();
    const result = await this.client.db('sample_mflix').collection('movies').deleteOne({ '_id': new ObjectId(id) });
    await this.dbDisconnect();

    if (result.deletedCount > 0) {
      console.log(`Movie with id '${id}' deleted successfully`);
    } else {
      console.log(`No movie found with id '${id}', no deletions were made`);
    }
  }
}
