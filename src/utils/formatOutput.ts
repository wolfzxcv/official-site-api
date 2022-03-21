import { DataInputFormat, DataOutputFormat } from '../@types/dataFormat';
import { decodeHtml } from './decodeHtml';
import { formatTimestamp } from './formatTimestamp';

export const formatOutput = (data: DataInputFormat[]) => {
  const output: DataOutputFormat[] = data.map(each => {
    const date = each.showTime ? each.showTime : each.time;

    const displayTime = formatTimestamp(date);

    const eachData: DataOutputFormat = {
      id: each.id,
      title: each.title,
      content: decodeHtml(each.content),
      displayTime
    };

    if (each.out_url) {
      eachData.url = each.out_url;
    }

    return eachData;
  });

  return output;
};
