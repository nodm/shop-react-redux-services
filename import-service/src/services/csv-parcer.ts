import csvParser from 'csv-parser';

class CsvParserService {
  private readonly csvParser = csvParser();

  public parse<T>(stream, mapper: (Record) => T): Promise<T[]> {
    const content: T[] = [];

    return new Promise((resolve, reject) => {
      stream
        .pipe(this.csvParser)
        .on('data', (data) => {
          content.push(mapper(data));
        })
        .on('end', () => {
          resolve(content);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }
}

export const csvParserService = new CsvParserService();
