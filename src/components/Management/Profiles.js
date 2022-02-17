import React from 'react';

const Profiles = ({ fbLogin, instaLogin }) => {
  const [fbName, setFbName] = useState(null);
  const [fbImageUrl, setFbImageUrl] = useState(null);

  const [instaName, setInstaName] = useState(null);
  const [instaImageUrl, setInstaImageUrl] = useState(null);

  const [profiles, setProfiles] = useState([]);

  const getUserNameAndAvatar = (media) => {
    onValue(child(dbRef, media), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (media === 'facebook') {
          setFbName(data.name);
          setFbImageUrl(data.profile_picture_url);
          setFbPageToken(data.page_token);
        } else if (media === 'instagram') {
          setInstaName(data.name);
          setInstaImageUrl(data.profile_picture_url);
        }
      }
    });
  };
  useEffect(() => {
    getUserNameAndAvatar('facebook');
    getUserNameAndAvatar('instagram');

    onValue(query(postRef, orderByChild('time')), (snapshot) => {
      if (snapshot.exists()) {
        var posts = {};
        snapshot.forEach((item) => {
          posts[item.key] = item.val();
        });
        setList(posts);
      }
    });
  }, []);

  return <div></div>;
};

export default Profiles;
