import Endpoint from '../utils/Endpoint';
import Extractor, {
  ExtractorContent,
  ExtractorStorage,
  RunableExtractor,
} from './Extractor';

export interface AudioExtractorStorage extends ExtractorStorage {
  audios: Array<{
    url: string;
    version: string;
  }>;
}

export class AudioExtractor
  extends Extractor
  implements RunableExtractor<AudioExtractorStorage>
{
  createExtratorStorage(): AudioExtractorStorage {
    return {
      audios: [],
    };
  }

  constructor(extractors = {}) {
    super(extractors);
  }

  run(content: ExtractorContent): AudioExtractorStorage | void {
    const audioDomain = Endpoint.getDomain();
    const regExp = /^playSound\(this,(".*")\);/;
    const onClick = content.attr('onclick');
    const storage = this.createExtratorStorage();

    if (!onClick) return;

    const regExpResult = onClick.match(regExp);

    if (!regExpResult) return;

    const parts = regExpResult[1].replace(/"/g, '').split(',');

    for (let i = 0; i < parts.length / 2; i++) {
      let b = 2 * i;

      storage.audios.push({
        url: `${audioDomain}mp3/${parts[b]}.mp3`,
        version: parts[b + 1],
      });
    }

    return storage;
  }
}

export default AudioExtractor;
