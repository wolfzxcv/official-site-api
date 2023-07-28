import { DataInputFormat, DataOutputFormat } from '../@types/dataFormat';
import { formatTimestamp } from './formatTimestamp';

export const formatOutput = (data: DataInputFormat[]) => {
  const output: DataOutputFormat[] = data.map(each => {
    const date = each.createTime;

    const time = formatTimestamp(date).replace(',', '');

    const eachData: DataOutputFormat = {
      id: each.id,
      title: each.title,
      content: each.content,
      time
    };

    if (each.externalLink) {
      eachData.url = each.externalLink;
    }

    return eachData;
  });

  return output;
};
