var fs = require('fs');
var util = require('util');
const request = require('request');
const { Client, RichEmbed } = require('discord.js');
const client = new Client();

var nameMap = new Map([
  ['Mirage','Мираж'],
  ['Lifeline','Лайфлайн'],
  ['Wraith','Рэйф'],
  ['Pathfinder','Патфайндер'],
  ['Bloodhound','Бладхаунд'],
  ['Caustic','Каустик'],
  ['Bangalore','Бангалор'],
  ['Gibraltar','Гибралтар'],
  ['Octane','Октейн']
]);

var legendsImagesMap = new Map([
  ['Mirage','https://apextab.com/images/offea-wide/Mirage.png'],
  ['Lifeline','https://apextab.com/images/offea-wide/Lifeline.png'],
  ['Wraith','https://apextab.com/images/offea-wide/Wraith.png'],
  ['Pathfinder','https://apextab.com/images/offea-wide/Pathfinder.png'],
  ['Bloodhound','https://apextab.com/images/offea-wide/Bloodhound.png'],
  ['Caustic','https://apextab.com/images/offea-wide/Caustic.png'],
  ['Bangalore','https://apextab.com/images/offea-wide/Bangalore.png'],
  ['Gibraltar','https://apextab.com/images/offea-wide/Gibraltar.png'],
  ['Octane','https://apextab.com/images/offea-wide/Octane.png']
]);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({ game: { name: 'Apex Legends' } });
});

client.on('message', message => {

  //Поиск напарников !s +1 нужен
  if (message.channel.id == 544558058978934804) {

    if (message.content.indexOf('!s ') + 1 || message.content.indexOf('!S ') + 1) {

      if (message.content.indexOf('!s ') + 1) {
        var getMessage = message.content.replace("!s ", "");
      } else if (message.content.indexOf('!S') + 1) {
        var getMessage = message.content.replace("!S ", "");
      }

      if (!isEmpty(getMessage)) {
        if (message.author.id != 544564633185419279 && message.author.id != 223445132333023243) {
          message.delete();
        }

        if (message.member.voiceChannelID != null) {
          fs.readFile('test.txt', 'utf8', function (err, contents) {
            var parseContent = JSON.parse(contents);

            if (parseContent.length == 0) {
              console.log('Файл пустой');

              
              const roomUser = message.member.voiceChannel.members.map(u => u.user.id);
              const roomUserName = message.member.voiceChannel.members.map(u => u.user.username);
              var imgOne = 'https://i.imgur.com/8nqztYH.png';
              var imgTwo = 'https://i.imgur.com/ShyIcAk.png';
              var imgFull = 'https://i.imgur.com/a7dbmqE.png';

              if (roomUser.length == 1) {
                var img = imgOne;

                var desc = `
            • <@${roomUser[0]}> - <:origin:546777302374285343> **${roomUserName[0]}**
            `;
              } else if (roomUser.length == 2) {
                var img = imgTwo;

                var desc = `
            • <@${roomUser[0]}> - <:origin:546777302374285343> **${roomUserName[0]}**
            • <@${roomUser[1]}> - <:origin:546777302374285343> **${roomUserName[1]}**
            `;
              } else if (roomUser.length == 3) {
                var img = imgFull;

                var desc = `
            • <@${roomUser[0]}> - <:origin:546777302374285343> **${roomUserName[0]}**
            • <@${roomUser[1]}> - <:origin:546777302374285343> **${roomUserName[1]}**
            • <@${roomUser[2]}> - <:origin:546777302374285343> **${roomUserName[2]}**
            `;
              }

              message.member.voiceChannel.createInvite()
                .then(invite => sendMessage(invite));

              function sendMessage(invite) {
                if (roomUser.length < 3) {
                  var inv = `
                  **Присоединиться:** ${invite.url}`;
                } else {
                  var inv = '';
                }

                sessVoiceId = message.member.voiceChannelID;

                const InfoRole = new RichEmbed()
                  .setAuthor(`${getMessage}`, message.author.avatarURL)
                  .setColor('#ffaf38')
                  .setDescription(desc + inv)
                  .setThumbnail(img);
                message.channel.send(InfoRole)
                  .then(function (message) {
                    data = [];
                    data[`${sessVoiceId}`] = `${client.user.lastMessageID}`;

                    fs.readFile('test.txt', 'utf8', function (err, contents) {
                      var parseContent = JSON.parse(contents);

                      parseContent.push({ "chanelID": `${sessVoiceId}`, "messageID": `${client.user.lastMessageID}` });

                      var str = JSON.stringify(parseContent, null, 1);
                      fs.writeFile('test.txt', str, (err) => {
                        if (err) throw err;
                      });
                    });
                  });
              }

            } else {

              if (contents.indexOf(message.member.voiceChannelID) + 1) {
                if (message.author.id != 544564633185419279 && message.author.id != 223445132333023243) {
                  message.delete();
                }
                message.author.send('**Поиск уже начат**');
                console.log('Строка найдена');
              }else{
                for (var i = 0, len = parseContent.length; i < len; i++) {
                  if (parseContent[i].chanelID == message.member.voiceChannelID) {
                  } else {
                    const roomUser = message.member.voiceChannel.members.map(u => u.user.id);
                    const roomUserName = message.member.voiceChannel.members.map(u => u.user.username);
                    var imgOne = 'https://i.imgur.com/8nqztYH.png';
                    var imgTwo = 'https://i.imgur.com/ShyIcAk.png';
                    var imgFull = 'https://i.imgur.com/a7dbmqE.png';
  
                    if (roomUser.length == 1) {
                      var img = imgOne;
                      var desc = `
                  • <@${roomUser[0]}> - <:origin:546777302374285343> **${roomUserName[0]}**
                  `;
                    } else if (roomUser.length == 2) {
                      var img = imgTwo;
                      var desc = `
                  • <@${roomUser[0]}> - <:origin:546777302374285343> **${roomUserName[0]}**
                  • <@${roomUser[1]}> - <:origin:546777302374285343> **${roomUserName[1]}**
                  `;
                    } else if (roomUser.length == 3) {
                      var img = imgFull;
                      var desc = `
                  • <@${roomUser[0]}> - <:origin:546777302374285343> **${roomUserName[0]}**
                  • <@${roomUser[1]}> - <:origin:546777302374285343> **${roomUserName[1]}**
                  • <@${roomUser[2]}> - <:origin:546777302374285343> **${roomUserName[2]}**
                  `;
                    }
  
                    message.member.voiceChannel.createInvite()
                      .then(invite => sendMessage(invite));
  
                    function sendMessage(invite) {
                      if (roomUser.length < 3) {
                        var inv = `
                        **Присоединиться:** ${invite.url}`;
                      } else {
                        var inv = '';
                      }
  
                      sessVoiceId = message.member.voiceChannelID;
  
                      const InfoRole = new RichEmbed()
                        .setAuthor(`${getMessage}`, message.author.avatarURL)
                        .setColor('#ffaf38')
                        .setDescription(desc + inv)
                        .setThumbnail(img);
                      message.channel.send(InfoRole)
                        .then(function (message) {
                          data = [];
                          data[`${sessVoiceId}`] = `${client.user.lastMessageID}`;
  
                          fs.readFile('test.txt', 'utf8', function (err, contents) {
                            var parseContent = JSON.parse(contents);
  
                            parseContent.push({ "chanelID": `${sessVoiceId}`, "messageID": `${client.user.lastMessageID}` });
  
                            var str = JSON.stringify(parseContent, null, 1);
                            fs.writeFile('test.txt', str, (err) => {
                              if (err) throw err;
                            });
                          });
                        });
                    }
                  }
                }
              }

              console.log('Файл не пустой');
            }

          });

        } else {
          if (message.author.id != 544564633185419279 && message.author.id != 223445132333023243) {
            message.delete();
          }
          message.author.send('**Перед поиском вы должни находится в голосовом чате.**');
        }
      }
    } else {
      if (message.author.id != 544564633185419279 && message.author.id != 223445132333023243) {
        message.delete();
      }
      message.author.send('**Для поиска используйте команду !s перед вашим сообщением**```Пример: !s Нужен +1```');
    }
  }

  //Бот статистика !stat jEMIXSs
  if (message.channel.id == 549052980712964136) {
    if (message.content.indexOf('!stat ') + 1 || message.content.indexOf('!STAT ') + 1) {
      if (message.content.indexOf('!stat ') + 1) {
        var getMessage = message.content.replace("!stat ", "");
      } else if (message.content.indexOf('!STAT') + 1) {
        var getMessage = message.content.replace("!STAT ", "");
      }

      if (!isEmpty(getMessage)) {
        if (message.author.id != 544564633185419279) {
          message.delete();
        }

        function callback(error, response, body) {
          if (!error && response.statusCode == 200) {
            const info = JSON.parse(body);

            const infoStat = new RichEmbed()
            .setAuthor(`Статистика - `+info.data.metadata.platformUserHandle, message.author.avatarURL)
            .setColor(6013938)
            .setDescription(`
            **• Уровень:** ${info.data.metadata.level} 〽
            **• Убийств:** ${info.data.stats[1].displayValue} 💀
            **• Персонаж:** ${nameMap.get(info.data.children[0].metadata.legend_name)}
            `)
            .setFooter("Cтатистику запросил - "+message.author.username, "http://i.imgur.com/w1vhFSR.png")
            .setTimestamp()
            .setThumbnail(legendsImagesMap.get(info.data.children[0].metadata.legend_name));
    
            message.reply(infoStat);

          }else{
            message.author.send('**Ваш профиль не найден, возможно вы указали неверный никнейм.**');
          }
        }
        
        const options = {
          url: 'https://public-api.tracker.gg/apex/v1/standard/profile/5/'+getMessage,
          headers: {
            'TRN-Api-Key': 'f10d3ac6-d374-40ca-bbda-a0d0b9fb2711'
          }
        };

        console.log(getMessage);
        request(options, callback);
      }
    } else {
      if (message.author.id != 544564633185419279 && message.author.id != 223445132333023243) {
        message.delete();
      }
      message.author.send('**Для получения статистики используйте команду !stat ВАШ-НИК**```Пример: !stat jemixss```');
    }
  }
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
  //console.log(newMember.voiceChannel.members.map(u => u.user.id));

  //Читаем файл 
  fs.readFile('test.txt', 'utf8', function (err, contents) {
    ps = JSON.parse(contents);

    for (var i = 0, len = ps.length; i < len; i++) {
      if (ps[i].chanelID == newMember.voiceChannelID) {

        client.channels.get('544558058978934804').fetchMessage(ps[i].messageID)
          .then(function (message) {

            roomUsers = newMember.voiceChannel.members.map(u => u.user.id);
            roomUserName = newMember.voiceChannel.members.map(u => u.user.username);

            var imgOne = 'https://i.imgur.com/8nqztYH.png';
            var imgTwo = 'https://i.imgur.com/ShyIcAk.png';
            var imgFull = 'https://i.imgur.com/a7dbmqE.png';

            if (roomUsers.length == 1) {
              var img = imgOne;

              var desc = `
          • <@${roomUsers[0]}> - <:origin:546777302374285343> **${roomUserName[0]}**
          `;
            } else if (roomUsers.length == 2) {
              var img = imgTwo;

              var desc = `
          • <@${roomUsers[0]}> - <:origin:546777302374285343> **${roomUserName[0]}**
          • <@${roomUsers[1]}> - <:origin:546777302374285343> **${roomUserName[1]}**
          `;
            } else if (roomUsers.length >= 3) {
              var img = imgFull;

              var desc = `
          • <@${roomUsers[0]}> - <:origin:546777302374285343> **${roomUserName[0]}**
          • <@${roomUsers[1]}> - <:origin:546777302374285343> **${roomUserName[1]}**
          • <@${roomUsers[2]}> - <:origin:546777302374285343> **${roomUserName[2]}**
          `;
            }

            newMember.voiceChannel.createInvite()
              .then(function (invite) {

                if (roomUsers.length < 3) {
                  var inv = `
                    **Присоединиться:** ${invite.url}`;
                } else {
                  var inv = '';
                }

                const updateEmb = new RichEmbed()
                  .setAuthor(`${message.embeds[0].author.name}`, message.author.avatarURL)
                  .setColor('#ffaf38')
                  .setDescription(desc + inv)
                  .setThumbnail(img);
                message.edit(updateEmb);
              });
          })
          .catch(console.error);
      } else if (ps[i].chanelID == oldMember.voiceChannelID) {
        client.channels.get('544558058978934804').fetchMessage(ps[i].messageID)
          .then(function (message) {

            roomUsers = oldMember.voiceChannel.members.map(u => u.user.id);
            roomUserName = oldMember.voiceChannel.members.map(u => u.user.username);

            console.log(roomUsers.length);

            if (roomUsers.length == 0) {
              var mass = JSON.parse(contents);
              mass.splice(ps[i], 1);

              var strs = JSON.stringify(mass, null, 1);

              fs.writeFile('test.txt', strs, (err) => {
                if (err) throw err;
              });
            }else{
              roomUsers = oldMember.voiceChannel.members.map(u => u.user.id);
            roomUserName = oldMember.voiceChannel.members.map(u => u.user.username);
  
              var imgOne = 'https://i.imgur.com/8nqztYH.png';
              var imgTwo = 'https://i.imgur.com/ShyIcAk.png';
              var imgFull = 'https://i.imgur.com/a7dbmqE.png';
  
              if (roomUsers.length == 1) {
                var img = imgOne;
  
                var desc = `
            • <@${roomUsers[0]}> - <:origin:546777302374285343> **${roomUserName[0]}**
            `;
              } else if (roomUsers.length == 2) {
                var img = imgTwo;
  
                var desc = `
            • <@${roomUsers[0]}> - <:origin:546777302374285343> **${roomUserName[0]}**
            • <@${roomUsers[1]}> - <:origin:546777302374285343> **${roomUserName[1]}**
            `;
              } else if (roomUsers.length >= 3) {
                var img = imgFull;
  
                var desc = `
            • <@${roomUsers[0]}> - <:origin:546777302374285343> **${roomUserName[0]}**
            • <@${roomUsers[1]}> - <:origin:546777302374285343> **${roomUserName[1]}**
            • <@${roomUsers[2]}> - <:origin:546777302374285343> **${roomUserName[2]}**
            `;
              }
  
              oldMember.voiceChannel.createInvite()
                .then(function (invite) {
  
                  if (roomUsers.length < 3) {
                    var inv = `
                      **Присоединиться:** ${invite.url}`;
                  } else {
                    var inv = '';
                  }
  
                  const updateEmb = new RichEmbed()
                    .setAuthor(`${message.embeds[0].author.name}`, message.author.avatarURL)
                    .setColor('#ffaf38')
                    .setDescription(desc + inv)
                    .setThumbnail(img);
                  message.edit(updateEmb);
                });
            }
          })
          .catch(console.error);
      }
    }
  });
});

function isEmpty(str) {
  if (str.trim() == '')
    return true;

  return false;
}

client.login('NTQ0NTY0NjMzMTg1NDE5Mjc5.D0M87Q.5IC6CeaJqBiECeSd9ZrjTOuxhSY');

client.on('raw', event => {
  const eventName = event.t;

  if (eventName === 'MESSAGE_REACTION_ADD'){
    if (event.d.message_id === '561907032366776321'){
      var reactionChannel = client.channels.get(event.d.channel_id);

      if (reactionChannel.messages.has(event.d.message_id))
        return;
      else{
        reactionChannel.fetchMessage(event.d.message_id)
        .then(msg => {
          var msgReaction = msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id);
          var user = client.users.get(event.d.user_id)
          client.emit('messageReactionAdd',msgReaction, user);
        })
        .catch(err => console.log(err));
      }
    }
  }
});

client.on('messageReactionAdd', (messageReaction, user) => {

  //console.log(messageReaction.message.reactions);

  var roleName = messageReaction.emoji.name;
  var member = messageReaction.message.guild.members.find(member => member.id === user.id);

  if(member && messageReaction.message.id === '561907032366776321') {
    if(roleName == 'Wraith') {
      user.send("Вы получили роль - <:Wraith:561299398366199808> Рейф");

      member.removeRoles(['561299689517875250','561299951716532224','561300150530605057','561300000525647884','561299915104321576','561299887891677194','561299824641572880','561300041063596054','561299857566859304'])
      .then(function() {
        member.addRole('561299857566859304');
      })
      .catch(console.error);
    }else if(roleName == 'Gibraltar') {
      user.send("Вы получили роль - <:Gibraltar:561299398911590431> Гибралтар");

      member.removeRoles(['561299689517875250','561299951716532224','561300150530605057','561300000525647884','561299915104321576','561299887891677194','561299824641572880','561300041063596054','561299857566859304'])
      .then(function() {
        member.addRole('561300041063596054');
      })
      .catch(console.error);
    }else if(roleName == 'Mirage') {
      user.send("Вы получили роль - <:Mirage:561299398613663767> Мираж");

      member.removeRoles(['561299689517875250','561299951716532224','561300150530605057','561300000525647884','561299915104321576','561299887891677194','561299824641572880','561300041063596054','561299857566859304'])
      .then(function() {
        member.addRole('561299887891677194');
      })
      .catch(console.error);
    }else if(roleName == 'Caustic') {
      user.send("Вы получили роль - <:Caustic:561299396344545292> Каустик");

      member.removeRoles(['561299689517875250','561299951716532224','561300150530605057','561300000525647884','561299915104321576','561299887891677194','561299824641572880','561300041063596054','561299857566859304'])
      .then(function() {
        member.addRole('561299824641572880');
      })
      .catch(console.error);
    }else if(roleName == 'Octane') {
      user.send("Вы получили роль - <:Octane:561299396185292800> Откейн");

      member.removeRoles(['561299689517875250','561299951716532224','561300150530605057','561300000525647884','561299915104321576','561299887891677194','561299824641572880','561300041063596054','561299857566859304'])
      .then(function() {
        member.addRole('561299915104321576');
      })
      .catch(console.error);
    }else if(roleName == 'Pathfinder') {
      user.send("Вы получили роль - <:Pathfinder:561299395535044608> Патфайндер");

      member.removeRoles(['561299689517875250','561299951716532224','561300150530605057','561300000525647884','561299915104321576','561299887891677194','561299824641572880','561300041063596054','561299857566859304'])
      .then(function() {
        member.addRole('561299951716532224');
      })
      .catch(console.error);
    }else if(roleName == 'lifeline') {
      user.send("Вы получили роль - <:lifeline:561299395400957983> Лайфлайн");

      member.removeRoles(['561299689517875250','561299951716532224','561300150530605057','561300000525647884','561299915104321576','561299887891677194','561299824641572880','561300041063596054','561299857566859304'])
      .then(function() {
        member.addRole('561300000525647884');
      })
      .catch(console.error);
    }else if(roleName == 'Bloodhound') {
      user.send("Вы получили роль - <:Bloodhound:561299375314173953> Бладхаунд");

      member.removeRoles(['561299689517875250','561299951716532224','561300150530605057','561300000525647884','561299915104321576','561299887891677194','561299824641572880','561300041063596054','561299857566859304'])
      .then(function() {
        member.addRole('561300150530605057');
      })
      .catch(console.error);
    }else if(roleName == 'Bangalore') { 
      user.send("Вы получили роль - <:Bangalore:561299374525906964> Бангалор");

      member.removeRoles(['561299689517875250','561299951716532224','561300150530605057','561300000525647884','561299915104321576','561299887891677194','561299824641572880','561300041063596054','561299857566859304'])
      .then(function() {
        member.addRole('561299689517875250');
      })
      .catch(console.error);
    }
  }
});
