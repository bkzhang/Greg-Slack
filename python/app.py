import os
from slackclient import SlackClient
from Setting import TOKEN, TEST_TOKEN

bot = SlackClient(os.environ.get(TOKEN))

def list_channels():
  channels_call = bot.api_call('channels.list')
  if channels_call.get('ok'):
    return channels_call['channels']
  return None

if __name__ == '__main__':
  channels = list_channels()
  if channels:
    print('Channels: ')
    for c in channels:
      print(c['name'] + ' (' + c['id'] + ')')
  else:
    print('unable to authenticate')
