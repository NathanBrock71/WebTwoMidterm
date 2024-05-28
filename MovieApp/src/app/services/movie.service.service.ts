import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {
  private mongoService = new MongoDBService();

  constructor() { }

  getMovies() {
    return this.mongoService.findAll();
  }

  getMovieById(id: string) {
    return this.mongoService.findById(id);
  }

  updateMovie(id: string, update: any) {
    this.mongoService.update(id, update);
  }

  createMovie(movie: any) {
    this.mongoService.create(movie);
  }

  deleteMovie(id: string) {
    this.mongoService.delete(id);
  }

  getMoviesWithPagination(page: number, pagesize: number) {
    return this.mongoService.findAllWithPagination(page, pagesize)
  }
}

class MongoDBService {
  private authUrl = 'https://us-east-2.aws.services.cloud.mongodb.com/api/client/v2.0/app/data-vhvipgy/auth/providers/local-userpass/login';
  private dataApiUrl = 'https://us-east-2.aws.data.mongodb-api.com/app/data-vhvipgy/endpoint/data/v1/action';
  private email = 'test1@gmail.com';
  private password = 'MCWzhx9ZMbSBiB5g';

  // Method to authenticate and get the access token
  private async authenticate(): Promise<string> {
    const response = await fetch(this.authUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.email,
        password: this.password
      })
    });

    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.access_token;
  }

  // Method to find a document by ID
  public async findById(id: string): Promise<void> {
    try {
      const accessToken = await this.authenticate();

      const requestBody = {
        collection: "movies",
        database: "sample_mflix",
        dataSource: "MidtermDB",
        filter: { _id: { $oid: id } },
        projection: { _id: 1, title: 1, genres: 1, runtime: 1, rated: 1, released: 1, directors: 1, plot: 1, fullplot: 1, poster: 1 }
      };

      const response = await fetch(`${this.dataApiUrl}/findOne`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': '*',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (result.document) {
        console.log(`Found a listing in the collection with the id: '${id}':`);
        console.log(result.document);
      } else {
        console.log(`No listings found with the id '${id}'`);
      }
    } catch (error) {
      console.error('Error fetching the data:', error);
    }
  }

  // Method to get all movies
  public async findAll(): Promise<void> {
    try {
      const accessToken = await this.authenticate();

      const requestBody = {
        collection: "movies",
        database: "sample_mflix",
        dataSource: "MidtermDB",
        projection: { _id: 1, title: 1, genres: 1, runtime: 1, rated: 1, released: 1, directors: 1, plot: 1, fullplot: 1, poster: 1 }
      };

      const response = await fetch(`${this.dataApiUrl}/find`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': '*',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (result.documents) {
        console.log('Found the following listings in the collection:');
        console.log(result.documents);
      } else {
        console.log('No listings found');
      }
    } catch (error) {
      console.error('Error fetching the data:', error);
    }
  }

  // Method to create a new movie
  public async create(movie: any): Promise<void> {
    try {
      const accessToken = await this.authenticate();

      const requestBody = {
        collection: "movies",
        database: "sample_mflix",
        dataSource: "MidtermDB",
        document: movie
      };

      const response = await fetch(`${this.dataApiUrl}/insertOne`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': '*',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      console.log('Inserted a document into the collection:');
      console.log(result);
    } catch (error) {
      console.error('Error inserting the data:', error);
    }
  }

  // Method to update a movie by ID
  public async update(id: string, update: any): Promise<void> {
    try {
      const accessToken = await this.authenticate();

      const requestBody = {
        collection: "movies",
        database: "sample_mflix",
        dataSource: "MidtermDB",
        filter: { _id: { $oid: id } },
        update: { $set: update }
      };

      const response = await fetch(`${this.dataApiUrl}/updateOne`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': '*',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      console.log('Updated the document in the collection:');
      console.log(result);
    } catch (error) {
      console.error('Error updating the data:', error);
    }
  }

  // Method to delete a movie by ID
  public async delete(id: string): Promise<void> {
    try {
      const accessToken = await this.authenticate();

      const requestBody = {
        collection: "movies",
        database: "sample_mflix",
        dataSource: "MidtermDB",
        filter: { _id: { $oid: id } }
      };

      const response = await fetch(`${this.dataApiUrl}/deleteOne`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': '*',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      console.log('Deleted the document from the collection:');
      console.log(result);
    } catch (error) {
      console.error('Error deleting the data:', error);
    }
  }

  // Method to get all movies with pagination
  public async findAllWithPagination(page: number = 1, pageSize: number = 8): Promise<any[]> {
    try {
      const accessToken = await this.authenticate();

      const requestBody = {
        collection: "movies",
        database: "sample_mflix",
        dataSource: "MidtermDB",
        projection: { _id: 1, title: 1, genres: 1, runtime: 1, rated: 1, released: 1, directors: 1, plot: 1, fullplot: 1, poster: 1 },
        limit: pageSize,
        skip: (page - 1) * pageSize
      };

      const response = await fetch(`${this.dataApiUrl}/find`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': '*',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      const movies = result.documents || [];

      // Set default poster if not provided
      movies.forEach((movie: any) => {
        if (!movie.poster) {
          movie.poster = '../assets/img/default-movie.png';
        }
      });

      return movies;
    } catch (error) {
      console.error('Error fetching the data:', error);
      return [];
    }
  }

}